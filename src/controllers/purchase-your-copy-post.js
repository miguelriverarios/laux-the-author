const getQueryParameter = require('../middleware/getQueryParameter');
const catchError = require('../util/catchError');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const pageType = 'purchase-your-copy';

const purchaseYourCopyPost = async (req, res) => {
    const priceType = getQueryParameter(req, "type");
    const isInternational = /international/.test(priceType);
    const allowedCountries = !isInternational ? ['US']
        : ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ'];
    const priceTypeId = /autographed-paperback/.test(priceType) && isInternational ? 'price_1HiRqmGLXd0wRqTHsB8iMSZU'
        : /autographed-paperback/.test(priceType) ? 'price_1HFTk7GLXd0wRqTHX0nDz7rb'
            : isInternational ? 'price_1HiRrDGLXd0wRqTH25SYEoIU'
                : 'price_1HFTgNGLXd0wRqTHj1VWbTfi';

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceTypeId,
                    quantity: 1,
                }
            ],
            mode: 'payment',
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: allowedCountries
            },
            success_url: 'https://lauxtheauthor.com/purchase-your-copy?session_id={CHECKOUT_SESSION_ID}&status=success',
            cancel_url: 'https://lauxtheauthor.com/purchase-your-copy?cancel-purchase=true'
        });

        res.json({ id: session.id });

    } catch (err) {
        catchError(err, pageType);
    }

}

module.exports = purchaseYourCopyPost;