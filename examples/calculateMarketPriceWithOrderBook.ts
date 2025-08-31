import { ClobClient, Side, OrderType } from "../src";

// Example showing how to use calculateMarketPrice with a pre-fetched order book
async function exampleUsage() {
    // Assume you have a ClobClient instance
    const clobClient = new ClobClient("http://localhost:8080", 1); // Replace with real config

    const tokenID = "some-token-id";
    
    // Traditional usage - fetches order book internally
    console.log("Traditional usage (fetches order book):");
    try {
        const price1 = await clobClient.calculateMarketPrice(tokenID, Side.BUY, 100, OrderType.FOK);
        console.log("Market price:", price1);
    } catch (error) {
        console.log("Error:", error);
    }

    // New usage - pass order book to skip API call
    console.log("\nNew usage (reuses pre-fetched order book):");
    try {
        // Fetch order book once and reuse it
        const orderBook = await clobClient.getOrderBook(tokenID);
        
        if (orderBook) {
            // Calculate multiple prices without additional API calls
            const buyPrice = await clobClient.calculateMarketPrice(
                tokenID, 
                Side.BUY, 
                100, 
                OrderType.FOK, 
                orderBook  // <-- Pass the pre-fetched order book
            );
            
            const sellPrice = await clobClient.calculateMarketPrice(
                tokenID, 
                Side.SELL, 
                100, 
                OrderType.FOK, 
                orderBook  // <-- Reuse the same order book
            );
            
            console.log("Buy price:", buyPrice);
            console.log("Sell price:", sellPrice);
            console.log("Spread:", buyPrice - sellPrice);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

// This example demonstrates the performance benefit:
// - Before: 3 API calls (1 for each calculateMarketPrice)
// - After: 1 API call (getOrderBook once, then reuse for multiple calculations)

export { exampleUsage };