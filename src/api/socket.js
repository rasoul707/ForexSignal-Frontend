import { WSBaseUrl as baseUrl } from "../config/server"

export const wsSignals = (broker) => new WebSocket(baseUrl + "signal" + broker + "/");
export const wsNews = () => new WebSocket(baseUrl + "news/");



