const page = require('webpage').create();
const system = require('system');
const test_url = system.args[1];
const $ = require('jquery')

page.viewportSize = {
    width: 1920,
    height: 1080
}
page.open(test_url, function(status) {
    console.log(`Opening ${test_url}...`);
    if(status === "success") {
        console.log('Success!')
        const shopPageContent = page.content;
        const document = $(shopPageContent)
        const productsElem = document.find(".products");
        if (productsElem) {
            const productElems = productsElem.find('li')
            if (productElems.length) {
                const randomProductIndex = randomInRange(0, productElems.length - 1);
                const pElem = productElems.eq(randomProductIndex);
                if (pElem) {
                    const pUrlElem = pElem.find("a.woocommerce-loop-product__link");
                    const titleElem = pElem.find('.product_title');
                    if (pUrlElem) {
                        const pUrl = pUrlElem.attr('href');
                        if (pUrl) {
                            console.log(`Opening product page with url ${pUrl} ...`)
                            const pPage = page.open(pUrl, function (status) {
                                if (status === 'success') {
                                    console.log('Success!')
                                    const pDocument = $(page.content)
                                    const snippet = pDocument.find('.wc-latitudefinance-latitudepay-container');
                                    if (snippet) {
                                        console.log("A snippet was found in product page!")
                                    } else {
                                        console.log('No snippets found!')
                                    }

                                }
                                phantom.exit()
                            })
                        }

                    }
                }
            }
        }
    }
})

function randomInRange(from, to) {
    return to - Math.ceil((Math.random() * (to - from)))
}
