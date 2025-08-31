import { expect } from "chai";
import { UserOrder, UserMarketOrder, OrderType, Side } from "../src/types";

describe("Order Type Constraints", () => {
    describe("UserOrder (limit orders)", () => {
        it("should accept GTC order type", () => {
            const order: UserOrder = {
                tokenID: "123",
                price: 0.5,
                size: 100,
                side: Side.BUY,
                orderType: OrderType.GTC
            };
            expect(order.orderType).to.equal(OrderType.GTC);
        });

        it("should accept GTD order type", () => {
            const order: UserOrder = {
                tokenID: "123",
                price: 0.5,
                size: 100,
                side: Side.BUY,
                orderType: OrderType.GTD
            };
            expect(order.orderType).to.equal(OrderType.GTD);
        });

        it("should work without orderType (optional)", () => {
            const order: UserOrder = {
                tokenID: "123",
                price: 0.5,
                size: 100,
                side: Side.BUY
            };
            expect(order.orderType).to.be.undefined;
        });
    });

    describe("UserMarketOrder (market orders)", () => {
        it("should accept FOK order type", () => {
            const order: UserMarketOrder = {
                tokenID: "123",
                amount: 100,
                side: Side.BUY,
                orderType: OrderType.FOK
            };
            expect(order.orderType).to.equal(OrderType.FOK);
        });

        it("should accept FAK order type", () => {
            const order: UserMarketOrder = {
                tokenID: "123",
                amount: 100,
                side: Side.BUY,
                orderType: OrderType.FAK
            };
            expect(order.orderType).to.equal(OrderType.FAK);
        });

        it("should work without orderType (optional)", () => {
            const order: UserMarketOrder = {
                tokenID: "123",
                amount: 100,
                side: Side.BUY
            };
            expect(order.orderType).to.be.undefined;
        });
    });
});