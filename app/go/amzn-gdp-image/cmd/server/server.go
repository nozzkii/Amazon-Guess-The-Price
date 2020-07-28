package main

import (
	"context"
	"io/ioutil"
	"log"
	"path/filepath"
	"fmt"
	"strconv"

	"github.com/chromedp/cdproto/emulation"
	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

const testProduct = "https://www.amazon.de/dp/B07MK5JWGN"

func main() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	var buf []byte

	// Stat returns a FileInfo describing the named file.
	// If there is an error, it will be of type *PathError.
	filename := "./../../../../static/img/product_screenshot"

	matches, err := filepath.Glob(filename + "*.png")


	/*if _, err := os.Stat("product_screenshot.png"); err == nil {

		if err := chromedp.Run(ctx, screenshot(testProduct, &buf)); err != nil {
			log.Fatal(err)
		}
		if err := ioutil.WriteFile("product_screenshot2.png", buf, 0644); err != nil {
			log.Fatal(err)
		}*/
  // path/to/whatever exists

	if err == nil {

		filenumber := strconv.Itoa(len(matches) + 1)
		string := filename + filenumber + ".png"

		if err := chromedp.Run(ctx, screenshot(testProduct, &buf)); err != nil {
			log.Fatal(err)
		}
		if err := ioutil.WriteFile(string, buf, 0644); err != nil {
			log.Fatal(err)
		}
		fmt.Print(len(matches))
    }else{
		if err := chromedp.Run(ctx, screenshot(testProduct, &buf)); err != nil {
			log.Fatal(err)
		}
		if err := ioutil.WriteFile(filename + ".png", buf, 0644); err != nil {
			log.Fatal(err)
		}
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
