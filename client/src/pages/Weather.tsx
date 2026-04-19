import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import {
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  MapPin,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Dumbbell,
  Target,
  Clock,
  Shield,
  Loader2,
  Navigation,
} from "lucide-react";

// Activity recommendation thresholds
const TEMP_HOT = 28;       // °C — above this is considered hot for equestrian activity
const TEMP_COLD = 8;       // °C — below this is considered cold; extended warm-up required
const WIND_MODERATE = 20;  // km/h — moderate wind; may distract horses
const WIND_HIGH = 35;      // km/h — high wind; outdoor jumping not recommended
const PRECIP_LIGHT = 2;    // mm — light rain; ground begins to get wet
const PRECIP_HEAVY = 5;    // mm — heavy rain; outdoor jumping not recommended
const HUMIDITY_HIGH = 80;  // % — high humidity; horses sweat heavily

function WeatherContent() {
  const [detectingLocation, setDetectingLocation] = useState(false);
  const utils = trpc.useUtils();

  // Open-Meteo live weather endpoints
  const {
    data: currentWeather,
    isLoading: currentLoading,
    isFetching: currentFetching,
    refetch: refetchCurrent,
  } = trpc.weather.getCurrent.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const { data: forecast, isLoading: forecastLoading, refetch: refetchForecast } =
    trpc.weather.getForecast.useQuery(undefined, {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
    });

  const { data: hourly, isLoading: hourlyLoading, refetch: refetchHourly } =
    trpc.weather.getHourly.useQuery(undefined, {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
    });

  const updateLocation = trpc.weather.updateLocation.useMutation({
    onSuccess: () => {
      toast.success("Location saved — loading weather…");
      refetchCurrent();
      refetchForecast();
    },
    onError: (err) => toast.error(err.message || "Failed to save location"),
    onSettled: () => setDetectingLocation(false),
  });

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateLocation.mutate({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
          location: undefined,
        });
      },
      (error) => {
        setDetectingLocation(false);
        toast.error(`Could not detect location: ${error.message}`);
      },
      { timeout: 10000 },
    );
  };

  const handleRefresh = () => {
    refetchCurrent();
    refetchForecast();
    refetchHourly();
  };
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "excellent":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800";
      case "fair":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-800";
      case "poor":
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800";
      case "not_recommended":
      case "unsafe":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800";      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "excellent":
      case "good":
        return <CheckCircle className="w-5 h-5" />;
      case "fair":
        return <AlertTriangle className="w-5 h-5" />;
      case "poor":
      case "unsafe":
        return <XCircle className="w-5 h-5" />;
      default:
        return <CloudSun className="w-5 h-5" />;
    }
  };

  const getTrainingRecommendations = (weather: typeof currentWeather) => {
    if (!weather) return [];
    const { temperature, windSpeed, precipitation, humidity } = weather.weather;
    const level = weather.advice.level;

    // When conditions are unsafe (e.g. night-time, extreme weather), ALL outdoor
    // activities are not recommended — override individual checks.
    const isUnsafe = level === "unsafe";
    const isHot = temperature >= TEMP_HOT;
    const isCold = temperature <= TEMP_COLD;
    const isWindy = windSpeed >= WIND_MODERATE;
    const isVeryWindy = windSpeed >= WIND_HIGH;
    const isRaining = precipitation > PRECIP_LIGHT;
    const isHighHumidity = humidity >= HUMIDITY_HIGH;

    const recs: Array<{
      activity: string;
      advice: string;
      suitable: boolean;
      duration?: string;
      icon: React.ReactNode;
    }> = [];

    // ── Flatwork / Dressage ───────────────────────────────────────────────────
    if (isUnsafe) {
      recs.push({
        activity: "Flatwork / Dressage",
        advice: "Outdoor schooling is not recommended. Use a covered arena or rest your horse until conditions improve.",
        suitable: false,
        icon: <Target className="w-4 h-4 text-red-500 dark:text-red-400" />,
      });
    } else if (level === "excellent") {
      recs.push({
        activity: "Flatwork / Dressage",
        advice: `Ideal conditions for precision work — ${temperature}°C with ${windSpeed} km/h wind. Focus on lateral movements, collection, and test preparation. Horse will be relaxed and responsive.`,
        suitable: true,
        duration: "45–60 minutes",
        icon: <Target className="w-4 h-4 text-green-600 dark:text-green-400" />,
      });
    } else if (level === "good") {
      recs.push({
        activity: "Flatwork / Dressage",
        advice: isHot
          ? `Good for flatwork — warm at ${temperature}°C so keep the session focused and efficient. Ensure fresh water is available. Avoid prolonged collection work.`
          : isCold
          ? `Good for flatwork — extend your warm-up to 15 min in ${temperature}°C conditions. Back muscles need longer to loosen. Reduce canter work until horse is supple.`
          : isWindy
          ? `Workable for flatwork but ${windSpeed} km/h wind may distract your horse. Allow 5–10 min for settling before asking for precise movements.`
          : `Good conditions for flatwork at ${temperature}°C. Good day for transitions, rhythm work, and lateral exercises.`,
        suitable: true,
        duration: isHot ? "30–45 minutes" : "40–55 minutes",
        icon: <Target className="w-4 h-4 text-green-600 dark:text-green-400" />,
      });
    } else if (level === "fair") {
      recs.push({
        activity: "Flatwork / Dressage",
        advice: isRaining
          ? `Manageable in a covered arena. If riding outdoors in ${precipitation} mm rain, keep the session short and monitor footing carefully.`
          : `Conditions are workable at ${temperature}°C. Allow extra warm-up time and shorten the session if your horse becomes tense or fatigued.`,
        suitable: true,
        duration: "25–35 minutes",
        icon: <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      });
    } else {
      recs.push({
        activity: "Flatwork / Dressage",
        advice: `Poor conditions for outdoor schooling. Move to a covered arena if available. Keep walk work only — do not ask for collection or extended work in these conditions.`,
        suitable: false,
        duration: "15 minutes max (walk only)",
        icon: <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      });
    }

    // ── Jumping / Grid Work ───────────────────────────────────────────────────
    if (isUnsafe) {
      recs.push({
        activity: "Jumping / Grid Work",
        advice: "Jumping is not recommended. Wait for safe daylight conditions with good, dry footing before any fence work.",
        suitable: false,
        icon: <Dumbbell className="w-4 h-4 text-red-500 dark:text-red-400" />,
      });
    } else if (level === "excellent") {
      recs.push({
        activity: "Jumping / Grid Work",
        advice: `Excellent jumping conditions — ${temperature}°C with minimal wind. Good footing and calm air are ideal for grids and course work. Great day for introducing new exercises.`,
        suitable: true,
        duration: "30–45 minutes",
        icon: <Dumbbell className="w-4 h-4 text-green-600 dark:text-green-400" />,
      });
    } else if (isVeryWindy || precipitation > PRECIP_HEAVY) {
      recs.push({
        activity: "Jumping / Grid Work",
        advice: isVeryWindy
          ? `Not recommended — ${windSpeed} km/h wind significantly increases spooking risk around fences. Switch to groundwork or flatwork.`
          : `Not recommended — ${precipitation} mm rain creates wet ground around fence bases. Slip risk on takeoff and landing. Use ground poles only if outdoor arena.`,
        suitable: false,
        icon: <Dumbbell className="w-4 h-4 text-red-500 dark:text-red-400" />,
      });
    } else if (isRaining || isWindy) {
      recs.push({
        activity: "Jumping / Grid Work",
        advice: isRaining
          ? `Caution — ground is wet (${precipitation} mm). Lower fence heights to reduce slip risk on landing. Focus on ground poles and simple crosses if outdoors.`
          : `Caution — ${windSpeed} km/h wind may cause fences to clatter or your horse to startle. Keep heights low and allow more warm-up time.`,
        suitable: false,
        duration: "20 minutes max if proceeding",
        icon: <Dumbbell className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      });
    } else {
      recs.push({
        activity: "Jumping / Grid Work",
        advice: isHot
          ? `Possible in ${temperature}°C but keep jumping work short — heat increases fatigue and loss of form. Stick to grid work rather than full courses.`
          : `Good conditions for jumping work. ${temperature}°C and moderate wind — check footing before starting and warm up on flat first.`,
        suitable: true,
        duration: isHot ? "20–25 minutes" : "25–35 minutes",
        icon: <Dumbbell className="w-4 h-4 text-green-600 dark:text-green-400" />,
      });
    }

    // ── Hacking / Trail Ride ──────────────────────────────────────────────────
    if (isUnsafe) {
      recs.push({
        activity: "Hacking / Trail Ride",
        advice: "Hacking outdoors is not safe in current conditions. Stay in the arena or rest your horse.",
        suitable: false,
        icon: <CloudSun className="w-4 h-4 text-red-500 dark:text-red-400" />,
      });
    } else if (level === "excellent") {
      recs.push({
        activity: "Hacking / Trail Ride",
        advice: `Perfect day for a hack — ${temperature}°C and calm at ${windSpeed} km/h. Roads and trails should be in excellent condition. Ideal for a longer conditioning or relaxation ride.`,
        suitable: true,
        duration: "60–90 minutes",
        icon: <CloudSun className="w-4 h-4 text-green-600 dark:text-green-400" />,
      });
    } else if (isVeryWindy) {
      recs.push({
        activity: "Hacking / Trail Ride",
        advice: `Not recommended — ${windSpeed} km/h wind on open roads dramatically increases spooking risk. Flying debris and sudden gusts can cause dangerous reactions. Stay in the arena.`,
        suitable: false,
        icon: <CloudSun className="w-4 h-4 text-red-500 dark:text-red-400" />,
      });
    } else if (level === "good") {
      recs.push({
        activity: "Hacking / Trail Ride",
        advice: isHot
          ? `Good for a hack but at ${temperature}°C avoid midday sun. Ride early morning or evening and ensure water is available on longer routes.`
          : isCold
          ? `Good for a hack at ${temperature}°C — wrap up and allow extra warm-up on the road. Avoid trotting on cold, hard ground until muscles are loose.`
          : `Good conditions for a hack. ${temperature}°C with ${windSpeed} km/h wind — a pleasant, safe day for trail work or road riding.`,
        suitable: true,
        duration: isHot ? "45–60 minutes (cooler time of day)" : "60–75 minutes",
        icon: <CloudSun className="w-4 h-4 text-green-600 dark:text-green-400" />,
      });
    } else {
      recs.push({
        activity: "Hacking / Trail Ride",
        advice: isRaining
          ? `Possible on familiar routes but ${precipitation} mm rain means wet tracks — avoid waterlogged paths and steep ground. Wear hi-vis.`
          : `Possible with care. Stick to familiar, flat routes. Avoid high-traffic roads in wind. Keep the hack short.`,
        suitable: true,
        duration: "25–40 minutes",
        icon: <CloudSun className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      });
    }

    // ── Lunging / Groundwork ──────────────────────────────────────────────────
    if (isUnsafe) {
      recs.push({
        activity: "Lunging / Groundwork",
        advice: "Outdoor lunging is not recommended. In-hand groundwork in a covered school is a safe alternative until conditions improve.",
        suitable: false,
        icon: <Shield className="w-4 h-4 text-red-500 dark:text-red-400" />,
      });
    } else {
      const lungingAdvice = isCold
        ? `Good option in ${temperature}°C — lunging warms up muscles safely before ridden work. Increase trotting gradually. Avoid extended canter until horse is warm.`
        : isHot
        ? `Keep lunging short in ${temperature}°C heat — 15–20 min maximum. Focus on walk and trot only. Provide water before and after.`
        : isHighHumidity
        ? `Manageable but ${humidity}% humidity means your horse will sweat heavily. Monitor breathing rate and keep work periods short.`
        : `Good conditions for groundwork — ${temperature}°C and ${windSpeed} km/h wind. Use lunging to improve balance and responsiveness, or introduce new exercises with lower risk.`;
      recs.push({
        activity: "Lunging / Groundwork",
        advice: lungingAdvice,
        suitable: true,
        duration: isHot ? "15–20 minutes" : "20–30 minutes",
        icon: <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />,
      });
    }

    return recs;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weather & Riding Conditions"
        subtitle="Real-time weather data with intelligent riding recommendations, including time-of-day and precipitation analysis"
      />

      {/* Current Weather Card */}
      {currentLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          </CardContent>
        </Card>
      ) : currentWeather ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="w-6 h-6" />
                Current Conditions
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefresh}
                disabled={currentFetching}
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", currentFetching && "animate-spin")} />
                {currentFetching ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Weather Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Thermometer className="w-6 h-6 text-orange-500 mb-2" />
                <div className="text-2xl font-bold">
                  {currentWeather.weather.temperature}°C
                </div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Wind className="w-6 h-6 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">
                  {currentWeather.weather.windSpeed} km/h
                </div>
                <div className="text-sm text-muted-foreground">Wind Speed</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <CloudRain className="w-6 h-6 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">
                  {currentWeather.weather.precipitation} mm
                </div>
                <div className="text-sm text-muted-foreground">
                  Precipitation
                </div>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Droplets className="w-6 h-6 text-cyan-500 mb-2" />
                <div className="text-2xl font-bold">
                  {currentWeather.weather.humidity}%
                </div>
                <div className="text-sm text-muted-foreground">Humidity</div>
              </div>
            </div>

            {/* Riding Advice */}
            <div
              className={`p-4 rounded-lg border-2 ${getRecommendationColor(currentWeather.advice.level)}`}
            >
              <div className="flex items-start gap-3">
                {getRecommendationIcon(currentWeather.advice.level)}
                <div className="flex-1">
                  <div className="font-semibold text-lg capitalize mb-1">
                    {currentWeather.advice.level === "unsafe"
                      ? "Not Safe to Ride"
                      : `${currentWeather.advice.level.charAt(0).toUpperCase() + currentWeather.advice.level.slice(1)} Riding Conditions`}
                  </div>
                  <div className="text-xs font-medium opacity-70 mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Assessment based on current time ({new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}) and live weather
                  </div>
                  <p className="text-sm mb-3">
                    {currentWeather.advice.message}
                  </p>
                  {currentWeather.advice.warnings.length > 0 && (
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Active Warnings:</div>
                      {currentWeather.advice.warnings.map((warning, i) => (
                        <div
                          key={i}
                          className="text-sm flex items-center gap-2"
                        >
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          {warning}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Condition: {currentWeather.weather.condition} &bull; Last updated:{" "}
              {new Date(currentWeather.weather.timestamp).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-10">
            <div className="text-center space-y-4 max-w-sm mx-auto">
              <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <p className="font-medium">Location not set</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Allow location access to see live weather conditions and
                  riding recommendations for your area.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  onClick={handleDetectLocation}
                  disabled={detectingLocation}
                >
                  {detectingLocation ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Navigation className="w-4 h-4 mr-2" />
                  )}
                  {detectingLocation ? "Detecting…" : "Detect My Location"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/settings")}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Set in Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hourly Forecast */}
      {hourlyLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-16 shrink-0" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : hourly && (hourly as any[]).length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Hourly Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(hourly as any[]).slice(0, 24).map((h: any, i: number) => {
                const hourLabel = new Date(h.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const isNow = i === 0;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-lg text-center shrink-0 w-16",
                      isNow
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-muted/50",
                    )}
                  >
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {isNow ? "Now" : hourLabel}
                    </span>
                    <CloudSun className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold">
                      {Math.round(h.temperature ?? 0)}°
                    </span>
                    {(h.precipitation ?? 0) > 0 && (
                      <span className="text-[10px] text-blue-500 flex items-center gap-0.5">
                        <Droplets className="w-2.5 h-2.5" />
                        {h.precipitation}mm
                      </span>
                    )}
                    {(h.windSpeed ?? 0) > 0 && (
                      <span className="text-[10px] text-muted-foreground">
                        {Math.round(h.windSpeed)}
                        <span className="text-[9px]">km/h</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* 7-Day Forecast */}
      {forecastLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : forecast && forecast.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {forecast.map((day, i) => (
                <div key={i} className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <CloudSun className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm font-semibold">{day.tempMax}°</div>
                  <div className="text-xs text-muted-foreground">
                    {day.tempMin}°
                  </div>
                  <div className="text-xs mt-1">{day.condition}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Weather-Based Training Recommendations */}
      {currentWeather && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-indigo-500" />
              AI Training Recommendations
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Intelligent training suggestions based on current weather
              conditions
            </p>
            <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-300 mt-1">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                <strong>AI-generated guidance — informational only.</strong> Always apply your own judgement. This is not professional equestrian or veterinary advice and no safety guarantee is implied.
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {getTrainingRecommendations(currentWeather).map((rec, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${rec.suitable ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800" : "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800"}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${rec.suitable ? "bg-green-100 dark:bg-green-900/40" : "bg-amber-100 dark:bg-amber-900/40"}`}
                    >
                      {rec.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {rec.activity}
                        </span>
                        <Badge
                          variant={rec.suitable ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {rec.suitable ? "Recommended" : "Adjust"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {rec.advice}
                      </p>
                      {rec.duration && (
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Suggested:{" "}
                          {rec.duration}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Riding Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            General Riding Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <Thermometer className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                Avoid intense work when temperatures exceed 30°C or drop below
                5°C — warm up and cool down gradually.
              </p>
              <p className="flex items-start gap-2">
                <Wind className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                Strong winds (above 40 km/h) can spook horses — consider
                lungeing before mounting.
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <CloudRain className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                Wet footing increases slip risk — reduce speed and avoid sharp
                turns on muddy ground.
              </p>
              <p className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                High humidity (above 80%) combined with heat stresses horses
                quickly — shorten sessions and hydrate frequently.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Disclaimer */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-300">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          <strong>Safety disclaimer:</strong> Weather data and riding
          recommendations on this page are provided for general guidance only.
          Conditions can change rapidly — always exercise your own judgement and
          consult a qualified instructor or veterinary professional before
          riding. EquiProfile accepts no liability for decisions made based on
          weather data or AI-generated riding advice.
        </p>
      </div>
    </div>
  );
}

export default function Weather() {
  return (
    <DashboardLayout>
      <WeatherContent />
    </DashboardLayout>
  );
}
