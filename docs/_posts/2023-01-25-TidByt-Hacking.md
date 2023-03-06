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

 1/25/23
----------------
Spent a lot of time trying to find a stock API will serve me index scores like NASDAQ, DJI, S&P500 etc.. There appears to be one [Financial Modeling Prep - Indexes](https://site.financialmodelingprep.com/developer/docs/indexes-in-stock-market-free-api) but it looks like the index tickers are all in a premium tier. This probably won't work as all users of the applet will need to provide their own API key, this is a pattern I've seen across other apps in the community apps repo. I may have to code something up with static numbers and come back to the API problem as the pattern for fetching some JSON from an endpoint is simple. 

In other news the Pixlet APIs provide some cool features with regard to caching and encryption of things like API keys. All apps actually run on the TidByt servers and push frames out to your device forcing a refresh if the cache has been invalidated. Likewise any data pulled from other sources is cached with a TTL set within the app code. The part I'm most worried about is the visuals, the code is easy but my art skills are lacking. 

1/29/23
----------------
I decided to skip to hacking around in pixlet and I'll come back to finding an API that provides something I want to display. I used the tutorial + reading through some community code to make a stock app that takes in a few parameters (symbol, shares and an API key for alphavantage) and returns the value of the stock multiplied by the number of shares. This exact app is already in the community repo but for some reason it was not working on my TidByt device. I added in some caching and checks to make sure the cached price data is for the current stock symbol, we throw out the cached data if the symbol changes in the config. As expected the actual formatting of the output involved the most trial and error, not because the docs are bad but because I'm not particularly frontend minded. I think I'll move onto trying to use Goodreads/Kindle's API to display my reading progress, not a useful app but I like tracking my reading goals and it's not something anyone else has built. I'll need to pull the community repo to get started. 

![My First Output]({{ site.url }}{{ site.baseurl }}/assets/images/tidbyt-1-29.png)

1/31/23
----------------
I embarked on my Goodreads journey without realizing that Goodreads had killed off its public API in 2020. Not to be deterred, I decided to use this as a reason to learn a little more Starlark and built a web scraper aftering sorting out where the data I wanted lived publicly on Goodreads. Turns out , given what I am calling a challenge ID (not a user ID) Goodreads will serve up any public profile yearly reading challenge at https://www.goodreads.com/user_challenges/ . Using this I set up an applet to take in the challenge ID, make a GET request and parse the returned HTML to show how far along any given user is on their reading goals. 

This is what it looks like in Starlark

~~~
 challenge_page = http.get(GOODREADS_PROGRESS_URL + config.str("user_challenge_id", DEFAULT_CHALLENGE_ID))


        if challenge_page.status_code != 200:
            fail("Request failed with status %d", challenge_page.status_code)


        body = challenge_page.body()
        progress_div = re.findall(r"<div class='progressText'>([\s\S]*?)</div>", body)


        if not progress_div:
             fail("No challenge found at {}".format(config.str("user_challenge_id", DEFAULT_CHALLENGE_ID)))


        progress_nums = re.findall(r"\d+", progress_div[0])
        progress = progress_nums[0]
        goal = progress_nums[1]
~~~

It's pretty readable as it's basically python, including a ported over regular expressions library. I then did basically 0 work to display it as such. There is a toggle for an as of yet un implemented "are you on track function" which I'll do later.



![My SecondOutput]({{ site.url }}{{ site.baseurl }}/assets/images/tidbyt-1-30.png)

All in all not bad for a evening messing around, most information was either from the previously linked TidByt docs and the [Starlark spec](https://github.com/bazelbuild/starlark/blob/master/spec.md)

2/2/23
----------------
I decided I wanted to work on the visuals of this goodreads applet and thought it'd be fun if your little bookshelf filled up as you read books over the course of the year. This gave me a good chance to sort out how the different render functions worked and how to position things on the screen. I made a bunch of book art using [PixelArt](pixelart.com) as my editor (see my files here: [gallery](https://www.pixilart.com/larkin54/gallery)) and wrote a very dumb if statement that takes in the number of completed books from my Goodreads scraper and renders between 0 and 13 books. The average adult reads 12 books a year and my art skills ran out of steam so displaying more than that is task for later (if ever). What I was left with is a fun display that will update once a day if this app is running on your TidByt. I used some basic transformations to keep my 4 assets fresh-ish despite a lot of reuse. 

![Book Demo]({{ site.url }}{{ site.baseurl }}/assets/images/bookdemo.gif)

You can render your applet locally and then push that asset to your TidByt from the Pixlet CLI to see how it will look! This is a good time to talk about how this code will eventually be executed. The TidByt device does not run anything locally, rather it gets frames pushed to it from TidByts servers and the device simply renders the frame. This has some obvious limits to it, you're not going to be doing a bunch of computation on TidByt's dime and thus they have app efficiency requirements prior to merging into their community app repos. Additionally they enforce quality standards for caching and encryption of API keys. This is good in that everything that can run on your device is open sourced and adheres to similar standards. If you really wanted to leave the ecosystem you can flash the firmware on the device itself and do whatever you like. 

![Books IRL]({{ site.url }}{{ site.baseurl }}/assets/images/tidbyt-books1.jpg)

2/19/23
----------------
I polished up what I had written the other week and forked [tidbyt's community repo](https://github.com/tidbyt/community). Running the pixlet create script sets up a folder and does some basic scaffolding for you, I copy and pasted my code into the generated file and did a little clean up. First on the agenda was to remove all testing code and any references to my own account. In order to make this run out of the box for people I encrypted my personal challenge ID using pixlet's encrypt command from the CLI. This (I'm guessing here) encrypts the passed data with a public key from Tidbyt and is only able to be decrypted by a private key, at runtime, which resides with them. Because apps all ultimately run on tidbyt's servers this is a sensible way to let developers store API keys and other data with them without revealing it in code. 

I ran pixlet's code profiling, formatting, linting and checking commands to make sure things were running properly and up to TidByt's style standards and submitted a [PR](https://github.com/tidbyt/community/pull/1149). I give my PR a 50/50 chance of being accepted. While I don't think my solution is terrible (or I'd not have submitted it) the use of what is essentially a web scraper to get the progress data is not a great practice and certainly not something I'd let go into production for any sort of real service. That said there is no public API to get this data and short of reverse engineering Goodreads' private API it's the best option I've got. 

I'll check back in when I get feedback on my PR from the pixlet community. 

2/22/23
----------------
Turns out the cache keys are on a per app basis, all users of the app share a cache, this means that my storing of progress and goal are global unless we append some sort of unique indentifier to the cache key. To solve this I just appened the challenge ID when cacheing progress and goals. The shared cache per app makes a ton of sense if you are doing something like stock prices or other data that would be the same regardless of user but still requires some sort of calculation or API call. 

3/2/23
----------------
My PR was merged! The Goodreads Challenge Tracker will appear in the next version of the TidByt app released. I'll update this post when that happens but for now I'm considering this little project done. If I build something next it'll be an NCAA basketball scoreboard for specific teams but seeing as March Madness is about to start that is probably a project for the '23-'24 season. I don't often code outside of work as usually that itch is scratched (and then some) by my day to day contributions at Meta but this was a fun project where I got to learn something new and publish it out to a wider community. 

3/6/23
----------------
My app is live in the TidByt app! Happy reading. 
