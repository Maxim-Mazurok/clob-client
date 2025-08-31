"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ClobClient = void 0;
var types_1 = require("./types");
var headers_1 = require("./headers");
var http_helpers_1 = require("./http-helpers");
var errors_1 = require("./errors");
var utilities_1 = require("./utilities");
var endpoints_1 = require("./endpoints");
var builder_1 = require("./order-builder/builder");
var constants_1 = require("./constants");
var helpers_1 = require("./order-builder/helpers");
var ClobClient = /** @class */ (function () {
    // eslint-disable-next-line max-params
    function ClobClient(host, chainId, signer, creds, signatureType, funderAddress, geoBlockToken, useServerTime) {
        this.host = host.endsWith("/") ? host.slice(0, -1) : host;
        this.chainId = chainId;
        if (signer !== undefined) {
            this.signer = signer;
        }
        if (creds !== undefined) {
            this.creds = creds;
        }
        this.orderBuilder = new builder_1.OrderBuilder(signer, chainId, signatureType, funderAddress);
        this.tickSizes = {};
        this.negRisk = {};
        this.feeRates = {};
        this.geoBlockToken = geoBlockToken;
        this.useServerTime = useServerTime;
    }
    // Public endpoints
    ClobClient.prototype.getOk = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host, "/"))];
            });
        });
    };
    ClobClient.prototype.getServerTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.TIME))];
            });
        });
    };
    ClobClient.prototype.getSamplingSimplifiedMarkets = function (next_cursor) {
        if (next_cursor === void 0) { next_cursor = constants_1.INITIAL_CURSOR; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_SAMPLING_SIMPLIFIED_MARKETS), {
                        params: { next_cursor: next_cursor }
                    })];
            });
        });
    };
    ClobClient.prototype.getSamplingMarkets = function (next_cursor) {
        if (next_cursor === void 0) { next_cursor = constants_1.INITIAL_CURSOR; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_SAMPLING_MARKETS), {
                        params: { next_cursor: next_cursor }
                    })];
            });
        });
    };
    ClobClient.prototype.getSimplifiedMarkets = function (next_cursor) {
        if (next_cursor === void 0) { next_cursor = constants_1.INITIAL_CURSOR; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_SIMPLIFIED_MARKETS), {
                        params: { next_cursor: next_cursor }
                    })];
            });
        });
    };
    ClobClient.prototype.getMarkets = function (next_cursor) {
        if (next_cursor === void 0) { next_cursor = constants_1.INITIAL_CURSOR; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_MARKETS), {
                        params: { next_cursor: next_cursor }
                    })];
            });
        });
    };
    ClobClient.prototype.getMarket = function (conditionID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_MARKET).concat(conditionID))];
            });
        });
    };
    ClobClient.prototype.getOrderBook = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_ORDER_BOOK), {
                        params: { token_id: tokenID }
                    })];
            });
        });
    };
    ClobClient.prototype.getOrderBooks = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.post("".concat(this.host).concat(endpoints_1.GET_ORDER_BOOKS), {
                        data: params
                    })];
            });
        });
    };
    ClobClient.prototype.getTickSize = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tokenID in this.tickSizes) {
                            return [2 /*return*/, this.tickSizes[tokenID]];
                        }
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoints_1.GET_TICK_SIZE), {
                                params: { token_id: tokenID }
                            })];
                    case 1:
                        result = _a.sent();
                        this.tickSizes[tokenID] = result.minimum_tick_size.toString();
                        return [2 /*return*/, this.tickSizes[tokenID]];
                }
            });
        });
    };
    ClobClient.prototype.getNegRisk = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tokenID in this.negRisk) {
                            return [2 /*return*/, this.negRisk[tokenID]];
                        }
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoints_1.GET_NEG_RISK), {
                                params: { token_id: tokenID }
                            })];
                    case 1:
                        result = _a.sent();
                        this.negRisk[tokenID] = result.neg_risk;
                        return [2 /*return*/, this.negRisk[tokenID]];
                }
            });
        });
    };
    ClobClient.prototype.getFeeRateBps = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tokenID in this.feeRates) {
                            return [2 /*return*/, this.feeRates[tokenID]];
                        }
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoints_1.GET_FEE_RATE), {
                                params: { token_id: tokenID }
                            })];
                    case 1:
                        result = _a.sent();
                        this.feeRates[tokenID] = result.base_fee;
                        return [2 /*return*/, this.feeRates[tokenID]];
                }
            });
        });
    };
    /**
     * Calculates the hash for the given orderbook
     * @param orderbook
     * @returns
     */
    ClobClient.prototype.getOrderBookHash = function (orderbook) {
        return (0, utilities_1.generateOrderBookSummaryHash)(orderbook);
    };
    ClobClient.prototype.getMidpoint = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_MIDPOINT), {
                        params: { token_id: tokenID }
                    })];
            });
        });
    };
    ClobClient.prototype.getMidpoints = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.post("".concat(this.host).concat(endpoints_1.GET_MIDPOINTS), {
                        data: params
                    })];
            });
        });
    };
    ClobClient.prototype.getPrice = function (tokenID, side) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_PRICE), {
                        params: { token_id: tokenID, side: side }
                    })];
            });
        });
    };
    ClobClient.prototype.getPrices = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.post("".concat(this.host).concat(endpoints_1.GET_PRICES), {
                        data: params
                    })];
            });
        });
    };
    ClobClient.prototype.getSpread = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_SPREAD), {
                        params: { token_id: tokenID }
                    })];
            });
        });
    };
    ClobClient.prototype.getSpreads = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.post("".concat(this.host).concat(endpoints_1.GET_SPREADS), {
                        data: params
                    })];
            });
        });
    };
    ClobClient.prototype.getLastTradePrice = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_LAST_TRADE_PRICE), {
                        params: { token_id: tokenID }
                    })];
            });
        });
    };
    ClobClient.prototype.getLastTradesPrices = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.post("".concat(this.host).concat(endpoints_1.GET_LAST_TRADES_PRICES), {
                        data: params
                    })];
            });
        });
    };
    ClobClient.prototype.getPricesHistory = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_PRICES_HISTORY), {
                        params: params
                    })];
            });
        });
    };
    // L1 Authed
    /**
     * Creates a new API key for a user
     * @param nonce
     * @returns ApiKeyCreds
     */
    ClobClient.prototype.createApiKey = function (nonce) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL1Auth();
                        endpoint = "".concat(this.host).concat(endpoints_1.CREATE_API_KEY);
                        _a = headers_1.createL1Headers;
                        _b = [this.signer,
                            this.chainId,
                            nonce];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [4 /*yield*/, this.post(endpoint, { headers: headers }).then(function (apiKeyRaw) {
                                var apiKey = {
                                    key: apiKeyRaw.apiKey,
                                    secret: apiKeyRaw.secret,
                                    passphrase: apiKeyRaw.passphrase
                                };
                                return apiKey;
                            })];
                    case 5: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    /**
     * Derives an existing API key for a user
     * @param nonce
     * @returns ApiKeyCreds
     */
    ClobClient.prototype.deriveApiKey = function (nonce) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL1Auth();
                        endpoint = "".concat(this.host).concat(endpoints_1.DERIVE_API_KEY);
                        _a = headers_1.createL1Headers;
                        _b = [this.signer,
                            this.chainId,
                            nonce];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [4 /*yield*/, this.get(endpoint, { headers: headers }).then(function (apiKeyRaw) {
                                var apiKey = {
                                    key: apiKeyRaw.apiKey,
                                    secret: apiKeyRaw.secret,
                                    passphrase: apiKeyRaw.passphrase
                                };
                                return apiKey;
                            })];
                    case 5: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ClobClient.prototype.createOrDeriveApiKey = function (nonce) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.createApiKey(nonce).then(function (response) {
                        if (!response.key) {
                            return _this.deriveApiKey(nonce);
                        }
                        return response;
                    })];
            });
        });
    };
    ClobClient.prototype.getApiKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_API_KEYS;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.get("".concat(this.host).concat(endpoint), { headers: headers })];
                }
            });
        });
    };
    ClobClient.prototype.getClosedOnlyMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.CLOSED_ONLY;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.get("".concat(this.host).concat(endpoint), { headers: headers })];
                }
            });
        });
    };
    ClobClient.prototype.deleteApiKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.DELETE_API_KEY;
                        headerArgs = {
                            method: http_helpers_1.DELETE,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.del("".concat(this.host).concat(endpoint), { headers: headers })];
                }
            });
        });
    };
    ClobClient.prototype.getOrder = function (orderID) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = "".concat(endpoints_1.GET_ORDER).concat(orderID);
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.get("".concat(this.host).concat(endpoint), { headers: headers })];
                }
            });
        });
    };
    ClobClient.prototype.getTrades = function (params, only_first_page, next_cursor) {
        if (only_first_page === void 0) { only_first_page = false; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c, results, _params, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_TRADES;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        results = [];
                        next_cursor = next_cursor || constants_1.INITIAL_CURSOR;
                        _d.label = 5;
                    case 5:
                        if (!(next_cursor != constants_1.END_CURSOR && (next_cursor === constants_1.INITIAL_CURSOR || !only_first_page))) return [3 /*break*/, 7];
                        _params = __assign(__assign({}, params), { next_cursor: next_cursor });
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                params: _params
                            })];
                    case 6:
                        response = _d.sent();
                        next_cursor = response.next_cursor;
                        results = __spreadArray(__spreadArray([], results, true), response.data, true);
                        return [3 /*break*/, 5];
                    case 7: return [2 /*return*/, results];
                }
            });
        });
    };
    ClobClient.prototype.getTradesPaginated = function (params, next_cursor) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c, _params, _d, data, rest;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_TRADES;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _e.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _e.sent();
                        next_cursor = next_cursor || constants_1.INITIAL_CURSOR;
                        _params = __assign(__assign({}, params), { next_cursor: next_cursor });
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                params: _params
                            })];
                    case 5:
                        _d = _e.sent(), data = _d.data, rest = __rest(_d, ["data"]);
                        return [2 /*return*/, __assign({ trades: Array.isArray(data) ? __spreadArray([], data, true) : [] }, rest)];
                }
            });
        });
    };
    ClobClient.prototype.getNotifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_NOTIFICATIONS;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.get("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                params: { signature_type: this.orderBuilder.signatureType }
                            })];
                }
            });
        });
    };
    ClobClient.prototype.dropNotifications = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, l2HeaderArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.DROP_NOTIFICATIONS;
                        l2HeaderArgs = {
                            method: http_helpers_1.DELETE,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            l2HeaderArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.del("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                params: (0, http_helpers_1.parseDropNotificationParams)(params)
                            })];
                }
            });
        });
    };
    ClobClient.prototype.getBalanceAllowance = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c, _params;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_BALANCE_ALLOWANCE;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        _params = __assign(__assign({}, params), { signature_type: this.orderBuilder.signatureType });
                        return [2 /*return*/, this.get("".concat(this.host).concat(endpoint), { headers: headers, params: _params })];
                }
            });
        });
    };
    ClobClient.prototype.updateBalanceAllowance = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c, _params;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.UPDATE_BALANCE_ALLOWANCE;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        _params = __assign(__assign({}, params), { signature_type: this.orderBuilder.signatureType });
                        return [2 /*return*/, this.get("".concat(this.host).concat(endpoint), { headers: headers, params: _params })];
                }
            });
        });
    };
    ClobClient.prototype.createOrder = function (userOrder, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenID, tickSize, feeRateBps, negRisk, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.canL1Auth();
                        tokenID = userOrder.tokenID;
                        return [4 /*yield*/, this._resolveTickSize(tokenID, options === null || options === void 0 ? void 0 : options.tickSize)];
                    case 1:
                        tickSize = _c.sent();
                        return [4 /*yield*/, this._resolveFeeRateBps(tokenID, userOrder.feeRateBps)];
                    case 2:
                        feeRateBps = _c.sent();
                        userOrder.feeRateBps = feeRateBps;
                        if (!(0, utilities_1.priceValid)(userOrder.price, tickSize)) {
                            throw new Error("invalid price (".concat(userOrder.price, "), min: ").concat(parseFloat(tickSize), " - max: ").concat(1 - parseFloat(tickSize)));
                        }
                        if (!((_a = options === null || options === void 0 ? void 0 : options.negRisk) !== null && _a !== void 0)) return [3 /*break*/, 3];
                        _b = _a;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.getNegRisk(tokenID)];
                    case 4:
                        _b = (_c.sent());
                        _c.label = 5;
                    case 5:
                        negRisk = _b;
                        return [2 /*return*/, this.orderBuilder.buildOrder(userOrder, {
                                tickSize: tickSize,
                                negRisk: negRisk
                            })];
                }
            });
        });
    };
    ClobClient.prototype.createMarketOrder = function (userMarketOrder, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenID, tickSize, feeRateBps, _b, negRisk, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL1Auth();
                        tokenID = userMarketOrder.tokenID;
                        return [4 /*yield*/, this._resolveTickSize(tokenID, options === null || options === void 0 ? void 0 : options.tickSize)];
                    case 1:
                        tickSize = _d.sent();
                        return [4 /*yield*/, this._resolveFeeRateBps(tokenID, userMarketOrder.feeRateBps)];
                    case 2:
                        feeRateBps = _d.sent();
                        userMarketOrder.feeRateBps = feeRateBps;
                        if (!!userMarketOrder.price) return [3 /*break*/, 4];
                        _b = userMarketOrder;
                        return [4 /*yield*/, this.calculateMarketPrice(tokenID, userMarketOrder.side, userMarketOrder.amount, userMarketOrder.orderType)];
                    case 3:
                        _b.price = _d.sent();
                        _d.label = 4;
                    case 4:
                        if (!(0, utilities_1.priceValid)(userMarketOrder.price, tickSize)) {
                            throw new Error("invalid price (".concat(userMarketOrder.price, "), min: ").concat(parseFloat(tickSize), " - max: ").concat(1 - parseFloat(tickSize)));
                        }
                        if (!((_a = options === null || options === void 0 ? void 0 : options.negRisk) !== null && _a !== void 0)) return [3 /*break*/, 5];
                        _c = _a;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.getNegRisk(tokenID)];
                    case 6:
                        _c = (_d.sent());
                        _d.label = 7;
                    case 7:
                        negRisk = _c;
                        return [2 /*return*/, this.orderBuilder.buildMarketOrder(userMarketOrder, {
                                tickSize: tickSize,
                                negRisk: negRisk
                            })];
                }
            });
        });
    };
    ClobClient.prototype.createAndPostOrder = function (userOrder, options, orderType, deferExec) {
        if (orderType === void 0) { orderType = types_1.OrderType.GTC; }
        if (deferExec === void 0) { deferExec = false; }
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createOrder(userOrder, options)];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, this.postOrder(order, orderType, deferExec)];
                }
            });
        });
    };
    ClobClient.prototype.createAndPostMarketOrder = function (userMarketOrder, options, orderType, deferExec) {
        if (orderType === void 0) { orderType = types_1.OrderType.FOK; }
        if (deferExec === void 0) { deferExec = false; }
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createMarketOrder(userMarketOrder, options)];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, this.postOrder(order, orderType, deferExec)];
                }
            });
        });
    };
    ClobClient.prototype.getOpenOrders = function (params, only_first_page, next_cursor) {
        if (only_first_page === void 0) { only_first_page = false; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, l2HeaderArgs, headers, _a, _b, _c, results, _params, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_OPEN_ORDERS;
                        l2HeaderArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            l2HeaderArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        results = [];
                        next_cursor = next_cursor || constants_1.INITIAL_CURSOR;
                        _d.label = 5;
                    case 5:
                        if (!(next_cursor != constants_1.END_CURSOR && (next_cursor === constants_1.INITIAL_CURSOR || !only_first_page))) return [3 /*break*/, 7];
                        _params = __assign(__assign({}, params), { next_cursor: next_cursor });
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                params: _params
                            })];
                    case 6:
                        response = _d.sent();
                        next_cursor = response.next_cursor;
                        results = __spreadArray(__spreadArray([], results, true), response.data, true);
                        return [3 /*break*/, 5];
                    case 7: return [2 /*return*/, results];
                }
            });
        });
    };
    ClobClient.prototype.postOrder = function (order, orderType, deferExec) {
        var _a;
        if (orderType === void 0) { orderType = types_1.OrderType.GTC; }
        if (deferExec === void 0) { deferExec = false; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, orderPayload, l2HeaderArgs, headers, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.POST_ORDER;
                        orderPayload = (0, utilities_1.orderToJson)(order, ((_a = this.creds) === null || _a === void 0 ? void 0 : _a.key) || "", orderType, deferExec);
                        l2HeaderArgs = {
                            method: http_helpers_1.POST,
                            requestPath: endpoint,
                            body: JSON.stringify(orderPayload)
                        };
                        _b = headers_1.createL2Headers;
                        _c = [this.signer,
                            this.creds,
                            l2HeaderArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _d = _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _d = undefined;
                        _e.label = 3;
                    case 3: return [4 /*yield*/, _b.apply(void 0, _c.concat([_d]))];
                    case 4:
                        headers = _e.sent();
                        return [2 /*return*/, this.post("".concat(this.host).concat(endpoint), { headers: headers, data: orderPayload })];
                }
            });
        });
    };
    ClobClient.prototype.postOrders = function (args, deferExec) {
        var _a;
        if (deferExec === void 0) { deferExec = false; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, ordersPayload, _i, args_1, _b, order, orderType, orderPayload, l2HeaderArgs, headers, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.POST_ORDERS;
                        ordersPayload = [];
                        for (_i = 0, args_1 = args; _i < args_1.length; _i++) {
                            _b = args_1[_i], order = _b.order, orderType = _b.orderType;
                            orderPayload = (0, utilities_1.orderToJson)(order, ((_a = this.creds) === null || _a === void 0 ? void 0 : _a.key) || "", orderType, deferExec);
                            ordersPayload.push(orderPayload);
                        }
                        l2HeaderArgs = {
                            method: http_helpers_1.POST,
                            requestPath: endpoint,
                            body: JSON.stringify(ordersPayload)
                        };
                        _c = headers_1.createL2Headers;
                        _d = [this.signer,
                            this.creds,
                            l2HeaderArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _e = _f.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _e = undefined;
                        _f.label = 3;
                    case 3: return [4 /*yield*/, _c.apply(void 0, _d.concat([_e]))];
                    case 4:
                        headers = _f.sent();
                        return [2 /*return*/, this.post("".concat(this.host).concat(endpoint), { headers: headers, data: ordersPayload })];
                }
            });
        });
    };
    ClobClient.prototype.cancelOrder = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, l2HeaderArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.CANCEL_ORDER;
                        l2HeaderArgs = {
                            method: http_helpers_1.DELETE,
                            requestPath: endpoint,
                            body: JSON.stringify(payload)
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            l2HeaderArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.del("".concat(this.host).concat(endpoint), { headers: headers, data: payload })];
                }
            });
        });
    };
    ClobClient.prototype.cancelOrders = function (ordersHashes) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, l2HeaderArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.CANCEL_ORDERS;
                        l2HeaderArgs = {
                            method: http_helpers_1.DELETE,
                            requestPath: endpoint,
                            body: JSON.stringify(ordersHashes)
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            l2HeaderArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.del("".concat(this.host).concat(endpoint), { headers: headers, data: ordersHashes })];
                }
            });
        });
    };
    ClobClient.prototype.cancelAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, l2HeaderArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.CANCEL_ALL;
                        l2HeaderArgs = {
                            method: http_helpers_1.DELETE,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            l2HeaderArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.del("".concat(this.host).concat(endpoint), { headers: headers })];
                }
            });
        });
    };
    ClobClient.prototype.cancelMarketOrders = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, l2HeaderArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.CANCEL_MARKET_ORDERS;
                        l2HeaderArgs = {
                            method: http_helpers_1.DELETE,
                            requestPath: endpoint,
                            body: JSON.stringify(payload)
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            l2HeaderArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.del("".concat(this.host).concat(endpoint), { headers: headers, data: payload })];
                }
            });
        });
    };
    ClobClient.prototype.isOrderScoring = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.IS_ORDER_SCORING;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.get("".concat(this.host).concat(endpoint), { headers: headers, params: params })];
                }
            });
        });
    };
    ClobClient.prototype.areOrdersScoring = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, payload, headerArgs, headers, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.ARE_ORDERS_SCORING;
                        payload = JSON.stringify(params === null || params === void 0 ? void 0 : params.orderIds);
                        headerArgs = {
                            method: http_helpers_1.POST,
                            requestPath: endpoint,
                            body: payload
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        return [2 /*return*/, this.post("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                data: payload
                            })];
                }
            });
        });
    };
    // Rewards
    ClobClient.prototype.getEarningsForUserForDay = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c, results, next_cursor, params, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_EARNINGS_FOR_USER_FOR_DAY;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        results = [];
                        next_cursor = constants_1.INITIAL_CURSOR;
                        _d.label = 5;
                    case 5:
                        if (!(next_cursor != constants_1.END_CURSOR)) return [3 /*break*/, 7];
                        params = {
                            date: date,
                            signature_type: this.orderBuilder.signatureType,
                            next_cursor: next_cursor
                        };
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                params: params
                            })];
                    case 6:
                        response = _d.sent();
                        next_cursor = response.next_cursor;
                        results = __spreadArray(__spreadArray([], results, true), response.data, true);
                        return [3 /*break*/, 5];
                    case 7: return [2 /*return*/, results];
                }
            });
        });
    };
    ClobClient.prototype.getTotalEarningsForUserForDay = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c, params;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_TOTAL_EARNINGS_FOR_USER_FOR_DAY;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        params = {
                            date: date,
                            signature_type: this.orderBuilder.signatureType
                        };
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                params: params
                            })];
                    case 5: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ClobClient.prototype.getUserEarningsAndMarketsConfig = function (date, order_by, position, no_competition) {
        if (order_by === void 0) { order_by = ""; }
        if (position === void 0) { position = ""; }
        if (no_competition === void 0) { no_competition = false; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c, results, next_cursor, params, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_REWARDS_EARNINGS_PERCENTAGES;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        results = [];
                        next_cursor = constants_1.INITIAL_CURSOR;
                        _d.label = 5;
                    case 5:
                        if (!(next_cursor != constants_1.END_CURSOR)) return [3 /*break*/, 7];
                        params = {
                            date: date,
                            signature_type: this.orderBuilder.signatureType,
                            next_cursor: next_cursor,
                            order_by: order_by,
                            position: position,
                            no_competition: no_competition
                        };
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoint), {
                                headers: headers,
                                params: params
                            })];
                    case 6:
                        response = _d.sent();
                        next_cursor = response.next_cursor;
                        results = __spreadArray(__spreadArray([], results, true), response.data, true);
                        return [3 /*break*/, 5];
                    case 7: return [2 /*return*/, results];
                }
            });
        });
    };
    ClobClient.prototype.getRewardPercentages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headerArgs, headers, _a, _b, _c, _params;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.canL2Auth();
                        endpoint = endpoints_1.GET_LIQUIDITY_REWARD_PERCENTAGES;
                        headerArgs = {
                            method: http_helpers_1.GET,
                            requestPath: endpoint
                        };
                        _a = headers_1.createL2Headers;
                        _b = [this.signer,
                            this.creds,
                            headerArgs];
                        if (!this.useServerTime) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getServerTime()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c]))];
                    case 4:
                        headers = _d.sent();
                        _params = {
                            signature_type: this.orderBuilder.signatureType
                        };
                        return [2 /*return*/, this.get("".concat(this.host).concat(endpoint), { headers: headers, params: _params })];
                }
            });
        });
    };
    ClobClient.prototype.getCurrentRewards = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, next_cursor, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        next_cursor = constants_1.INITIAL_CURSOR;
                        _a.label = 1;
                    case 1:
                        if (!(next_cursor != constants_1.END_CURSOR)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoints_1.GET_REWARDS_MARKETS_CURRENT), {
                                params: { next_cursor: next_cursor }
                            })];
                    case 2:
                        response = _a.sent();
                        next_cursor = response.next_cursor;
                        results = __spreadArray(__spreadArray([], results, true), response.data, true);
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, results];
                }
            });
        });
    };
    ClobClient.prototype.getRawRewardsForMarket = function (conditionId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, next_cursor, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        next_cursor = constants_1.INITIAL_CURSOR;
                        _a.label = 1;
                    case 1:
                        if (!(next_cursor != constants_1.END_CURSOR)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.get("".concat(this.host).concat(endpoints_1.GET_REWARDS_MARKETS).concat(conditionId), {
                                params: { next_cursor: next_cursor }
                            })];
                    case 2:
                        response = _a.sent();
                        next_cursor = response.next_cursor;
                        results = __spreadArray(__spreadArray([], results, true), response.data, true);
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, results];
                }
            });
        });
    };
    ClobClient.prototype.getMarketTradesEvents = function (conditionID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("".concat(this.host).concat(endpoints_1.GET_MARKET_TRADES_EVENTS).concat(conditionID))];
            });
        });
    };
    ClobClient.prototype.calculateMarketPrice = function (tokenID, side, amount, orderType) {
        if (orderType === void 0) { orderType = types_1.OrderType.FOK; }
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOrderBook(tokenID)];
                    case 1:
                        book = _a.sent();
                        if (!book) {
                            throw new Error("no orderbook");
                        }
                        if (side === types_1.Side.BUY) {
                            if (!book.asks) {
                                throw new Error("no match");
                            }
                            return [2 /*return*/, (0, helpers_1.calculateBuyMarketPrice)(book.asks, amount, orderType)];
                        }
                        else {
                            if (!book.bids) {
                                throw new Error("no match");
                            }
                            return [2 /*return*/, (0, helpers_1.calculateSellMarketPrice)(book.bids, amount, orderType)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClobClient.prototype.canL1Auth = function () {
        if (this.signer === undefined) {
            throw errors_1.L1_AUTH_UNAVAILABLE_ERROR;
        }
    };
    ClobClient.prototype.canL2Auth = function () {
        if (this.signer === undefined) {
            throw errors_1.L1_AUTH_UNAVAILABLE_ERROR;
        }
        if (this.creds === undefined) {
            throw errors_1.L2_AUTH_NOT_AVAILABLE;
        }
    };
    ClobClient.prototype._resolveTickSize = function (tokenID, tickSize) {
        return __awaiter(this, void 0, void 0, function () {
            var minTickSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTickSize(tokenID)];
                    case 1:
                        minTickSize = _a.sent();
                        if (tickSize) {
                            if ((0, utilities_1.isTickSizeSmaller)(tickSize, minTickSize)) {
                                throw new Error("invalid tick size (".concat(tickSize, "), minimum for the market is ").concat(minTickSize));
                            }
                        }
                        else {
                            tickSize = minTickSize;
                        }
                        return [2 /*return*/, tickSize];
                }
            });
        });
    };
    ClobClient.prototype._resolveFeeRateBps = function (tokenID, userFeeRateBps) {
        return __awaiter(this, void 0, void 0, function () {
            var marketFeeRateBps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFeeRateBps(tokenID)];
                    case 1:
                        marketFeeRateBps = _a.sent();
                        if (marketFeeRateBps > 0 && userFeeRateBps != undefined && userFeeRateBps != marketFeeRateBps) {
                            throw new Error("invalid user provided fee rate: ".concat(userFeeRateBps, ", fee rate for the market must be ").concat(marketFeeRateBps));
                        }
                        return [2 /*return*/, marketFeeRateBps];
                }
            });
        });
    };
    // http methods
    ClobClient.prototype.get = function (endpoint, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, http_helpers_1.get)(endpoint, __assign(__assign({}, options), { params: __assign(__assign({}, options === null || options === void 0 ? void 0 : options.params), { geo_block_token: this.geoBlockToken }) }))];
            });
        });
    };
    ClobClient.prototype.post = function (endpoint, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, http_helpers_1.post)(endpoint, __assign(__assign({}, options), { params: __assign(__assign({}, options === null || options === void 0 ? void 0 : options.params), { geo_block_token: this.geoBlockToken }) }))];
            });
        });
    };
    ClobClient.prototype.del = function (endpoint, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, http_helpers_1.del)(endpoint, __assign(__assign({}, options), { params: __assign(__assign({}, options === null || options === void 0 ? void 0 : options.params), { geo_block_token: this.geoBlockToken }) }))];
            });
        });
    };
    return ClobClient;
}());
exports.ClobClient = ClobClient;
