package main

import (
	"context"
	"io/ioutil"
	"log"

	"github.com/chromedp/cdproto/emulation"
	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

const testProduct = "https://www.amazon.com/AmazonBasics-Performance-Alkaline-Batteries-100-Pack/dp/B00O869KJE"

func main() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	var buf []byte

	if err := chromedp.Run(ctx, screenshot(testProduct, &buf)); err != nil {
		log.Fatal(err)
	}
	if err := ioutil.WriteFile("product_screenshot.png", buf, 0644); err != nil {
		log.Fatal(err)
	}
}

func screenshot(urlstr string, res *[]byte) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(urlstr),
		chromedp.ActionFunc(func(ctx context.Context) error {
			err := emulation.SetDeviceMetricsOverride(1200, 1000, 1, false).
				WithScreenOrientation(&emulation.ScreenOrientation{
					Type:  emulation.OrientationTypePortraitPrimary,
					Angle: 0,
				}).
				Do(ctx)
			if err != nil {
				return err
			}

			*res, err = page.CaptureScreenshot().Do(ctx)
			if err != nil {
				return err
			}
			return nil
		}),
	}
}
