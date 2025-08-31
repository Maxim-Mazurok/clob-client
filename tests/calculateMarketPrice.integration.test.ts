import { expect } from "chai";
import { Side, OrderType, OrderBookSummary, OrderSummary } from "../src/types";

// Create a mock ClobClient-like class to test the method signature works
class MockClobClient {
    async getOrderBook(tokenID: string): Promise<OrderBookSummary | null> {
        // Return a mock order book
        return {
            market: "test-market",
            asset_id: tokenID,
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
    }

    async calculateMarketPrice(
        tokenID: string,
        side: Side,
        amount: number,
        orderType: OrderType = OrderType.FOK,
        orderBook?: OrderBookSummary,
    ): Promise<number> {
        // Import the functions dynamically to avoid circular imports
        const { calculateBuyMarketPrice, calculateSellMarketPrice } = await import("../src/order-builder/helpers");
        
        const book = orderBook || await this.getOrderBook(tokenID);
        if (!book) {
            throw new Error("no orderbook");
        }
        if (side === Side.BUY) {
            if (!book.asks) {
                throw new Error("no match");
            }
            return calculateBuyMarketPrice(book.asks, amount, orderType);
        } else {
            if (!book.bids) {
                throw new Error("no match");
            }
            return calculateSellMarketPrice(book.bids, amount, orderType);
        }
    }
}

describe("calculateMarketPrice method signature compatibility", () => {
    const client = new MockClobClient();

    it("should work without orderBook parameter (backward compatibility)", async () => {
        const result = await client.calculateMarketPrice("test-token", Side.BUY, 100, OrderType.FOK);
        expect(result).to.equal(0.55);
    });

    it("should work with orderBook parameter", async () => {
        const orderBook: OrderBookSummary = {
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

        const result = await client.calculateMarketPrice("test-token", Side.BUY, 100, OrderType.FOK, orderBook);
        expect(result).to.equal(0.55);
    });

    it("should skip API call when orderBook is provided", async () => {
        let apiCallCount = 0;
        
        // Override getOrderBook to count API calls
        const originalGetOrderBook = client.getOrderBook;
        client.getOrderBook = async function(tokenID: string) {
            apiCallCount++;
            return await originalGetOrderBook.call(this, tokenID);
        };

        const orderBook: OrderBookSummary = {
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

        // Call with orderBook provided - should not call API
        await client.calculateMarketPrice("test-token", Side.BUY, 100, OrderType.FOK, orderBook);
        expect(apiCallCount).to.equal(0);

        // Call without orderBook - should call API once
        await client.calculateMarketPrice("test-token", Side.BUY, 100, OrderType.FOK);
        expect(apiCallCount).to.equal(1);
    });
});