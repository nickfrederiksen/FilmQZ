export function getApiUrl(baseUrl: string, routeValues: ns.IDictionary<string>) {
    for (const key in routeValues) {
        if (routeValues.hasOwnProperty(key)) {
            const value = routeValues[key];

            baseUrl = baseUrl.replace("{" + key + "}", value);
        }
    }

    return baseUrl;
}
