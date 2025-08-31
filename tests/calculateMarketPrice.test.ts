import { expect } from "chai";
import { OrderType, OrderBookSummary, OrderSummary } from "../src/types";
import { calculateBuyMarketPrice, calculateSellMarketPrice } from "../src/order-builder/helpers";

describe("calculateMarketPrice with orderBook parameter", () => {
    // Mock order book data that matches the format from the existing helper tests
    const mockOrderBook: OrderBookSummary = {
        market: "test-market",
        asset_id: "test-asset",
        timestamp: "2023-01-01T00:00:00Z",
        bids: [
            { price: "0.4", size: "100" },
            { price: "0.45", size: "100" },
            { price: "0.5", size: "100" }
        ] as OrderSummary[],
        asks: [
            { price: "0.6", size: "100" },
            { price: "0.55", size: "100" },
            { price: "0.5", size: "100" }
        ] as OrderSummary[],
        min_order_size: "1",
        tick_size: "0.01",
        neg_risk: false,
        hash: "test-hash"
    };

    describe("calculateBuyMarketPrice with provided orderBook", () => {
        it("should calculate correct buy price when orderBook is provided", () => {
            // Amount to match is $100, which requires 0.5 ($50) + 0.55 ($55) = $105
            // So the price will be 0.55
            const result = calculateBuyMarketPrice(mockOrderBook.asks, 100, OrderType.FOK);
            expect(result).to.equal(0.55);
        });

        it("should work with smaller amounts", () => {
            // Amount to match is $50, which can be satisfied by the cheapest ask at 0.5
            const result = calculateBuyMarketPrice(mockOrderBook.asks, 50, OrderType.FOK);
            expect(result).to.equal(0.5);
        });
    });

    describe("calculateSellMarketPrice with provided orderBook", () => {
        it("should calculate correct sell price when orderBook is provided", () => {
            const result = calculateSellMarketPrice(mockOrderBook.bids, 100, OrderType.FOK);
            expect(result).to.equal(0.5);
        });

        it("should work with different amounts", () => {
            const result = calculateSellMarketPrice(mockOrderBook.bids, 150, OrderType.FOK);
            expect(result).to.equal(0.45);
        });
    });
});