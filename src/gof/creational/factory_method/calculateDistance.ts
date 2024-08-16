export function calculateDistance(fromLat: number, fromLong: number, toLat: number, toLong: number) {
    const earthRadius = 6371;
    const degreesToRadians = Math.PI / 180;
    const deltaLat = (toLat - fromLat) * degreesToRadians;
    const deltaLon = (toLong - fromLong) * degreesToRadians;

    const a = 
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(fromLat * degreesToRadians) *
        Math.cos(toLat * degreesToRadians) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return Math.round(earthRadius * c);
}

const distance = calculateDistance(-27.584905257808835, -48.545022195325124, 
    -27.496887588317275, -48.522234807851476);

console.log(distance);