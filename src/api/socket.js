const baseUrl = 'ws://195.248.242.210:8000/ws/';

export const wsSignals = new WebSocket(baseUrl + "signals/");
export const wsArticles = new WebSocket(baseUrl + "articles/");



