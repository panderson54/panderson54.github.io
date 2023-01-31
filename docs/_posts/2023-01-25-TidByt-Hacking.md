---
title:  "Adventures with TidByt"
classes: wide
categories:
  - software
tags:
  - journal
  - software
---
![TidByt in action]({{ site.url }}{{ site.baseurl }}/assets/images/tidbyt_banner.jpg)

Adventures with TidByt
=====================

TitByt is this pixel based display with a set of dev tools allowing you to make your own apps for it. Basically it's a fancy clock that you can program. I like how it looks and I'd been wanting to mess with a connected display for my home office for a while and to be honest I'm much handier with code than I am with a soldering iron so this seemed like a good fit.

https://tidbyt.com/ 

This is just going to be a stream of me trying to get some stuff to work, if anything get published to the TidByt app store I'll link all source code here. If not I either gave up or am running it locally and so embarrassed of my ~~hack job~~ code I didn't link it.
 
1/29/23
----------------
I decided to skip to hacking around in pixlet and I'll come back to finding an API that provides something I want to display. I used the tutorial + reading through some community code to make a stock app the takes in a few parameters, symbol, shares and an API key for alphavantage and returns the value of the stock multiplied by the number of shares. This exact app is already in the community repo but for some reason it was not working on my TidByt device. I added in some caching and checks for to make sure the cached price data is for the current stock symbol, we throw out the cached data if the symbol changes in the config. As expected the actual formatting of the output involved the most trail and error, not because the docs are bad but because I'm not particularly frontend minded. I think I'll move onto trying to use Goodreads/Kindle's API to display my reading progress, not a useful app but I like tracking my reading goals and it's not something anyone else has built. I'll need to pull the community repo to get started. 

![Wikipedia DHKE paint example]({{ site.url }}{{ site.baseurl }}/assets/images/tidbyt-1-29.png)

 1/25/23
----------------
Spent a lot of time trying to find a stock API will serve me index scores like NASDAQ, DJI, S&P500 etc.. There appears to be one [Financial Modeling Prep - Indexes](https://site.financialmodelingprep.com/developer/docs/indexes-in-stock-market-free-api) but it looks like the index tickers are all in a premium tier. This probably won't work as all users of the applet will need to provide their own API key, this is a pattern I've seen across other apps in the community apps repo. I may have to code something up with static numbers and come back to the API problem as the pattern for fetching some JSON from an endpoint is simple. 

In other news the Pixlet APIs provide some cool features with regard to caching and encryption of things like API keys. All apps actually run on the TidByt servers and push frames out to your device forcing a refresh if the cache has been invalidated. Likewise any data pulled from other sources is cached with a TTL set within the app code. The part I'm most worried about is the visuals, the code is easy but my art skills are lacking. 

1/24/23
----------------
Installed Pixlet CLI and got starlark syntax highlighting functioning on VSCode. I'd clearly not done any python development on this machine in a long time as pip was super out of date. Luckily powershell seems to have come a long way, I don't have a non-work unix machine lying around currently so this will all be done on windows for bonus points. 

Pixlet's CLI works really seamlessly, point it at a starlark file and it runs and prints the output locally to http://127.0.0.1:8080 

[Dev Documentation](https://tidbyt.dev/docs/build/build-for-tidbyt)

I've got a couple ideas of applets to build

**Specific NCAA Basketball Teams:** There are a bunch of sports scoring apps on the marketplace but I want to only show scores on the day my college basketball team is playing. The only other NCAA applet just shows either the top 25 or an entire conference, frankly unless it's Gonzaga I could care less so one option would be to build my ideal NCAA Basketball display. There are a few things to solve here, there is a scheduling tool within the TidByt config app but it's date driven, the calendar applet has an option to hide it in your display order if there are no other events that day, I'd like to build a similar function to hide my potential app if my team is not playing.

**Book Progress:** A goodreads based progress tracker for my current book. Kindle -> Goodreads -> TidByt. I've been wanting to use the goodreads API to drive a display for a while but ran into some issues with getting cover art from their API, I might just go with a stats display for the current year. 

**NASDAQ Composite Tracker:** The only trackers in game right now are stock specific, I'd like to be able to have updates on the S&P500 + NASDAQ as well. This might be my first go as it's a very straight forward display to build. 

I'll take a look at some existing apps and see what's already been done: 
[GitHub: tidbyt/community](https://github.com/tidbyt/community/tree/main/apps)
