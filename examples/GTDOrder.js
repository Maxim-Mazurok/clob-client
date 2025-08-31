"use strict";
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
exports.__esModule = true;
var ethers_1 = require("ethers");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var src_1 = require("../src");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, "../.env") });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var wallet, chainId, _a, _b, _c, host, creds, clobClient, YES, oneMinute, order, resp, resp2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    wallet = new ethers_1.ethers.Wallet("".concat(process.env.PK));
                    chainId = parseInt("".concat(process.env.CHAIN_ID || src_1.Chain.AMOY));
                    _b = (_a = console).log;
                    _c = "Address: ".concat;
                    return [4 /*yield*/, wallet.getAddress()];
                case 1:
                    _b.apply(_a, [_c.apply("Address: ", [_d.sent(), ", chainId: "]).concat(chainId)]);
                    host = process.env.CLOB_API_URL || "http://localhost:8080";
                    creds = {
                        key: "".concat(process.env.CLOB_API_KEY),
                        secret: "".concat(process.env.CLOB_SECRET),
                        passphrase: "".concat(process.env.CLOB_PASS_PHRASE)
                    };
                    clobClient = new src_1.ClobClient(host, chainId, wallet, creds);
                    YES = "71321045679252212594626385532706912750332728571942532289631379312455583992563";
                    oneMinute = parseInt(((new Date().getTime() + 60 * 1000 + 10 * 1000) / 1000).toString());
                    return [4 /*yield*/, clobClient.createOrder({
                            tokenID: YES,
                            price: 0.5,
                            side: src_1.Side.SELL,
                            size: 1000,
                            expiration: oneMinute
                        })];
                case 2:
                    order = _d.sent();
                    console.log("Created Order", order);
                    return [4 /*yield*/, clobClient.postOrder(order, src_1.OrderType.GTD)];
                case 3:
                    resp = _d.sent();
                    console.log(resp);
                    return [4 /*yield*/, clobClient.createAndPostOrder({
                            tokenID: YES,
                            price: 0.5,
                            side: src_1.Side.BUY,
                            size: 100,
                            expiration: oneMinute
                        }, { tickSize: "0.01" }, src_1.OrderType.GTD)];
                case 4:
                    resp2 = _d.sent();
                    console.log(resp2);
                    return [2 /*return*/];
            }
        });
    });
}
main();
