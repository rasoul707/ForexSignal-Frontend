import { WSBaseUrl as baseUrl } from "../config/server"

export const wsSignals = (broker) => new WebSocket(baseUrl + "signal" + broker + "/");
export const wsArticles = () => new WebSocket(baseUrl + "articles/");



