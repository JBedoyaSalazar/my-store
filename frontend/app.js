const API_URL = "http://localhost:3000/api/v1/products";

/**
 * Consulta la API de productos y muestra el resultado en la consola.
 *
 * @returns {Promise<void>}
 */
async function getProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const products = await response.json();

        console.log("Products:");
        console.table(products);
    } catch (error) {
        console.error("Error consuming API:", error);
    }
}

getProducts();
