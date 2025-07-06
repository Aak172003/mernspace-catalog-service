export interface PriceConfiguration {
    [key: string]: {
        // Union
        priceType: "base" | "aditional";
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    // widget type means the type of the widget that will be used to display the attribute
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}
