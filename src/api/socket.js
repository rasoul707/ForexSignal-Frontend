const baseUrl = 'ws://195.248.242.210:8000/ws/chat/';

export const wsSignals = new WebSocket(baseUrl + "signalsAlert/");
export const wsArticles = new WebSocket(baseUrl + "articles/");



