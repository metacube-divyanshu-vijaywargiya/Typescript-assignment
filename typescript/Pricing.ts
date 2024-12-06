export class Pricing {
    private prices: { [key: string]: number[] };

    constructor() {
        this.prices = {
            "Cycle": [10, 50, 150],        // Daily, Monthly, Yearly
            "TwoWheeler": [20, 100, 300],
            "FourWheeler": [30, 150, 450]
        };
    }

    public getPrices(vehicleType: string): number[] | null {
        return this.prices[vehicleType] || null; // Return prices or null for invalid vehicle type
    }
}
