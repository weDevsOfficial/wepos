export default {
    createProductsDB() {
        let db;
        const request = indexedDB.open( "ProductsDB", 1 );

        request.onerror = ( event ) => {
            console.error( "An error occurred with IndexedDB" );
            console.error( event );
        }

        // This method is only invoked after changing IndexedDB version.
        request.onupgradeneeded = ( event ) => {
            db = event.target.result;
            const objectStore = db.createObjectStore( "ProductsDB", { keyPath: "id" } );

            objectStore.createIndex( "title", "title", { unique: false } );
            objectStore.createIndex( "type", "type", { unique: false } );
            objectStore.createIndex( "sku", "sku", { unique: false } );
            objectStore.createIndex( "price", "price", { unique: false } );
            objectStore.createIndex( "stock", "stock", { unique: false } );
        };
    },

    insertProduct( product = {} ) {
        let db;
        const request = indexedDB.open( "ProductsDB", 1 );

        request.onerror = ( event ) => {
            console.error( "An error occurred with IndexedDB" );
            console.error( event );
        };

        request.onsuccess = ( event ) => {
            db = event.target.result;

            db.onerror = ( event ) => {
                // Generic error handler for all errors targeted at this database's requests.
                console.error( `Database error: ${event.target.error.code} - ${event.target.error.message}` );
            }

            const transaction = db.transaction( ["ProductsDB"], "readwrite" );
            const objectStore = transaction.objectStore( "ProductsDB" );

            objectStore.add( {
                id: product.id,
                title: product.name,
                type: product.type,
                sku: product.sku,
                price: product.price,
                stock: product.stock_quantity
            } );
        }
    },

    insertProducts( products = [] ) {
        let db;
        const request = indexedDB.open( "ProductsDB", 1 );

        request.onerror = ( event ) => {
            console.error( "An error occurred with IndexedDB" );
            console.error( event );
        };

        request.onsuccess = ( event ) => {
            db = event.target.result;

            db.onerror = ( event ) => {
                // Generic error handler for all errors targeted at this database's requests.
                console.error( `Database error: ${event.target.error.code} - ${event.target.error.message}` );
            }

            const transaction = db.transaction( ["ProductsDB"], "readwrite" );
            const objectStore = transaction.objectStore( "ProductsDB" );

            products.forEach( ( product ) => {
                objectStore.add( {
                    id: product.id,
                    title: product.name,
                    type: product.type,
                    sku: product.sku,
                    price: product.price,
                    stock: product.stock_quantity
                } );
            } );
        }
    },

    getAllProducts() {
        return new Promise( ( resolve, reject ) => {
            let db;
            const request = indexedDB.open( "ProductsDB", 1 );

            request.onerror = ( event ) => {
                console.error( "An error occurred with IndexedDB" );
                console.error( event );
            };

            request.onsuccess = ( event ) => {
                db = event.target.result;

                db.onerror = ( event ) => {
                    // Generic error handler for all errors targeted at this database's requests.
                    console.error( `Database error: ${event.target.error.code} - ${event.target.error.message}` );
                }

                const transaction = db.transaction( ["ProductsDB"], "readwrite" );
                const objectStore = transaction.objectStore( "ProductsDB" );

                objectStore.getAll().onsuccess = ( event ) => {
                    resolve( event.target.result );
                };
            }
        } );
    },

    getProductsBySearchKeyword( searchKeyword = "" ) {
        return new Promise( ( resolve, reject ) => {
            let db;
            const request = indexedDB.open( "ProductsDB", 1 );

            request.onerror = ( event ) => {
                console.error( "An error occurred with IndexedDB" );
                console.error( event );

                reject(event);
            };

            request.onsuccess = ( event ) => {
                db = event.target.result;

                db.onerror = ( event ) => {
                    // Generic error handler for all errors targeted at this database's requests.
                    // console.error( `Database error: ${event.target.error.code} - ${event.target.error.message}` );
                    reject( `Database error: ${event.target.error.code} - ${event.target.error.message}` );
                }

                const transaction = db.transaction( ["ProductsDB"], "readwrite" );
                const objectStore = transaction.objectStore( "ProductsDB" );

                let condition = new RegExp( searchKeyword );

                objectStore.getAll().onsuccess = ( event ) => {
                    let products = event.target.result;

                    let result = products.filter( ( product ) => {
                        return condition.test( product.title ) || condition.test( product.id ) || condition.test( product.sku );
                    } );

                    resolve( result );
                }
            }
        } );
    },

    updateProduct( product ) {
        return new Promise( ( resolve, reject ) => {
            let db;
            const request = indexedDB.open( "ProductsDB", 1 );

            request.onerror = ( event ) => {
                console.error( "An error occurred with IndexedDB" );
                console.error( event );

                reject(event);
            };

            request.onsuccess = ( event ) => {
                db = event.target.result;

                db.onerror = ( event ) => {
                    // Generic error handler for all errors targeted at this database's requests.
                    console.error( `Database error: ${event.target.error.code} - ${event.target.error.message}` );
                }

                const transaction = db.transaction( ["ProductsDB"], "readwrite" );
                const objectStore = transaction.objectStore( "ProductsDB" );

                objectStore.put( product ).onsuccess = ( event ) => {
                    resolve( event.target.result );
                };
            }
        });
    },

    deleteProductById( id ) {
        let db;
        const request = indexedDB.open( "ProductsDB", 1 );

        request.onerror = ( event ) => {
            console.error( "An error occurred with IndexedDB" );
            console.error( event );
        };

        request.onsuccess = ( event ) => {
            db = event.target.result;

            db.onerror = ( event ) => {
                // Generic error handler for all errors targeted at this database's requests.
                console.error( `Database error: ${event.target.error.code} - ${event.target.error.message}` );
            }

            const transaction = db.transaction( ["ProductsDB"], "readwrite" );
            const objectStore = transaction.objectStore( "ProductsDB" );

            objectStore.delete( id );
        }
    },

    deleteAllProducts() {
        let db;
        const request = indexedDB.open( "ProductsDB", 1 );

        request.onerror = ( event ) => {
            console.error( "An error occurred with IndexedDB" );
            console.error( event );
        };

        request.onsuccess = ( event ) => {
            db = event.target.result;

            db.onerror = ( event ) => {
                // Generic error handler for all errors targeted at this database's requests.
                console.error( `Database error: ${event.target.error.code} - ${event.target.error.message}` );
            }

            const transaction = db.transaction( ["ProductsDB"], "readwrite" );
            const objectStore = transaction.objectStore( "ProductsDB" );

            objectStore.clear();
        }
    }
}
