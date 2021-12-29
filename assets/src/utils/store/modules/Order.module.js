export default {
    namespaced: true,
    state: {
        orderdata :  {
            billing: {},
            shipping: {},
            customer_id: 0,
            customer_note: '',
            payment_method: '',
            payment_method_title: '',
        },
        canProcessPayment: false,
    },
    getters: {
        getCanProcessPayment: state => {
            return state.canProcessPayment;
        },
    },
    mutations: {
        setOrderData( state, orderdata ) {
            if ( weLo_.isEmpty( orderdata ) ) {
                state.orderdata = {
                    billing: {},
                    shipping: {},
                    customer_id: 0,
                    customer_note: '',
                    payment_method: '',
                    payment_method_title: '',
                }
            } else {
                state.orderdata = orderdata;
            }
        },

        setCustomer( state, customer ) {
            if ( Object.keys( customer ).length > 0 ) {
                state.orderdata.billing     = customer.billing;
                state.orderdata.shipping    = customer.shipping;
                state.orderdata.customer_id = customer.id;
            } else {
                state.orderdata.billing     = {};
                state.orderdata.shipping    = {};
                state.orderdata.customer_id = 0;
            }
        },

        emptyOrderdata( state ) {
            state.orderdata =  {
                billing: {},
                shipping: {},
                customer_id: 0,
                customer_note: '',
                payment_method: '',
                payment_method_title: '',
            };
        },

        setCustomerNote( state, note ) {
            state.orderdata.customer_note = note.trim();
        },

        removeCustomerNote( state ) {
            state.orderdata.customer_note = '';
        },

        setGateway( state, gateway ) {
            state.orderdata.payment_method       = gateway.id;
            state.orderdata.payment_method_title = gateway.title;
        },

        setCanProcessPayment( state, canProcessPayment ) {
            state.canProcessPayment = canProcessPayment;
        },
    },
    actions: {
        setOrderDataAction( context, orderdata ) {
            context.commit( 'setOrderData', orderdata );
        },

        setCustomerAction( context, customer ) {
            context.commit( 'setCustomer', customer );
        },

        emptyOrderdataAction( context ) {
            context.commit( 'emptyOrderdata' );
        },

        setCustomerNoteAction( context, note ) {
            context.commit( 'setCustomerNote', note );
        },

        removeCustomerNoteAction( context ) {
            context.commit( 'removeCustomerNote' );
        },

        setGatewayAction( context, gateway ) {
            context.commit( 'setGateway', gateway );
        },

        setCanProcessPaymentAction( context, canProcessPayment ) {
            context.commit( 'setCanProcessPayment', canProcessPayment );
        },
    }
};
