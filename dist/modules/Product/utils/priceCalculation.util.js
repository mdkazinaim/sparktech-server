"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProductPrice = void 0;
const calculateProductPrice = (basePrice, discountedPrice, selectedVariants, totalQuantity, comboPricing) => {
    // 1. Determine base unit price
    const pricePerUnit = discountedPrice || basePrice;
    // 2. Calculate subtotal and variant totals using replacement pricing
    let subtotal = 0;
    let totalVariantQty = 0;
    let variantTotal = 0;
    selectedVariants.forEach((v) => {
        if (v.quantity > 0) {
            const confirmPrice = v.price > 0 ? v.price : pricePerUnit;
            subtotal += confirmPrice * v.quantity;
            totalVariantQty += v.quantity;
            if (v.price > 0) {
                variantTotal += (v.price - pricePerUnit) * v.quantity;
            }
        }
    });
    // Handle remaining quantity (if any) that has no specific variant assigned
    if (totalQuantity > totalVariantQty) {
        subtotal += pricePerUnit * (totalQuantity - totalVariantQty);
    }
    // 4. Apply combo discount
    let comboDiscount = 0;
    if (comboPricing && comboPricing.length > 0) {
        const selectedValues = selectedVariants.filter(v => v.quantity > 0).map(v => v.value);
        const applicableCombo = comboPricing.filter(tier => {
            if (!tier.variantValue || tier.variantValue === "") {
                return true;
            }
            return selectedValues.includes(tier.variantValue);
        });
        const sortedCombo = [...applicableCombo].sort((a, b) => b.minQuantity - a.minQuantity);
        const tier = sortedCombo.find(t => totalQuantity >= t.minQuantity);
        if (tier) {
            comboDiscount = tier.discount;
        }
    }
    // 5. Calculate final total
    const finalTotal = Math.max(0, subtotal - comboDiscount);
    return {
        basePrice: pricePerUnit,
        variantTotal,
        subtotal,
        comboDiscount,
        finalTotal,
        totalQuantity
    };
};
exports.calculateProductPrice = calculateProductPrice;
