const API_KEY = "mcJ1B4qWTXdhLlrN3FFY24GDIz0t8ToM";
const CURRENT_CONDITIONS = `http://dataservice.accuweather.com/currentconditions/v1/324505?apikey=${API_KEY}&details=true`;
const DAILY_FORECAST = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/324505?apikey=${API_KEY}&metric=true`;
export {API_KEY, CURRENT_CONDITIONS, DAILY_FORECAST};