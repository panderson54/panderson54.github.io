---
title:  "Always/Never Paradox and Platform Trust & Safety"
classes: wide
categories:
  - software
  - nuclear
tags:
  - nuclear
  - software
---
![Titan 2 Missile]({{ site.url }}{{ site.baseurl }}/assets/images/titan2.png)

Always/Never
============

The always/never is a concept coined in the midst of the Cold War as the US grappled with how to safely manage its nuclear weapons while keeping them ready for immediate use as a deterrent. The problem was about how to make sure that an accidental nuclear use did not happen, whether through negligence, sabotage, accident or even unauthorized intended use while making sure that an authorized user could launch a live warhead in minutes if needed.  

>"The need for a nuclear weapon to be safe and the need for it to be reliable were often in conflict. A safety mechanism that made a bomb less likely to explode during an accident could also, during wartime, render it more likely to be a dud. The contradiction between these two design goals was succinctly expressed by the words “always/never.” Ideally, a nuclear weapon would always detonate when it was supposed to—and never detonate when it wasn’t supposed to.”"

\- *Eric Schlosser, Command And Control* 

Technologies or procedures that enable one end of the always/never spectrum typically move you away from the other. A code needed to launch a missile introduces some mechanism to render said missile inert should the code not be present, that is a failure point as well as an introduction of a delay. Keeping nuclear bombs strapped to planes on the flight line reduces the time needed to respond to an attack, it also means that a pilot could hop in and fly it off, starting World War III. In a bit of family history my paternal grandfather was the custodian of such weapons mounted to F-86Fs in West Germany at the height of the Cold War. 

![F84 in flight]({{ site.url }}{{ site.baseurl }}/assets/images/F84.jpg){: .align-center}

> "At a NATO base in Germany, Agnew looked out at the runway and, in his own words, “nearly wet my pants.” The F-84F fighter planes on alert, each carrying a fully assembled Mark 7 bomb, were being guarded by a single American soldier. Agnew walked over and asked the young enlisted man, who carried an old-fashioned, bolt-action rifle, what he’d do if somebody jumped into one of the planes and tried to take off. Would he shoot at the pilot—or the bomb? The soldier had never been told what to do"  

\- *Eric Schlosser, Command And Control* 

We actually deal with this concept in less extreme forms all the time, 'fail-safe' is the common word for engineering something to default to safe rather than dangerous state. For example my space heater when moved, tilted or knocked over shuts off. This is a value consideration by the engineers who built the device, it means that they've decided it's better to render a device inoperable in certain instances than it is to allow it to function potentially dangerously, placing them firmly on the never end of the always/never spectrum.

In the perverse world of nuclear arms we have the concept of  'fail-deadly', which describes policies that without outside inputs reach a deadly state, this case usually a launch order, rather than a safe state. The most shocking example of this is found in the Soviet 'Dead Hand' or 'Perimeter' system, which you can read more about in *The Dead Hand* by David E Hoffman, which is an extreme example of the always end of the spectrum.

>"The Strategic Air Command wanted bombs that were safe and reliable. But most of all, it wanted bombs that worked. A willingness to take personal risks was deeply embedded in SAC’s institutional culture [...] they would not be pleased, amid the chaos of thermonuclear warfare, to learn that the bombs they dropped didn’t detonate because of a safety device. Civilian weapon designers, on the other hand, were bound to have a different perspective—to think about the peacetime risk of an accident and err on the side of never." 

\- *Eric Schlosser, Command And Control* 



Where does this concept intersect with platform trust and safety?  
---------------------

![Always Never]({{ site.url }}{{ site.baseurl }}/assets/images/always_never.png)

The removal of speech from social media platforms is, to put it lightly, a hot button issue. In the US we have two political blocks both feeling that platforms are falling down on the job, but from opposite ends of the spectrum. I'm not going to touch Section 230, which shields platforms from liability for the speech they host, or the 1st Amendment, which does not require a platform to carry your speech, other than to say the mix of public feelings around freedom of expression and platforms relative immunity to the consequences of hosting that speech have created a lose-lose situation for social media platforms in the United States.

Platform trust and safety teams must wrestle with the always/never paradox when it comes to regulation of speech. In an ideal world we'd have a perfect system that always found and eliminated harmful speech on a platform (CSAM, terrorism, calls for violence, disinformation etc...) while never touching legitimate speech about those same subjects. A real world example would be the removal of ISIS recruitment videos while leaving up legitimate discourse or journalism that uses those same videos. This perfect system is a fantasy, careful moderation by discerning individuals does not scale to billions of users so we try to solve these problems at scale with technology but technology, just like people, has built in values.

When building systems to deal with speech on platforms you need to choose which end of the spectrum you are comfortable defaulting to, do you fail-safe or fail-deadly? Failing safe (biasing towards harm reduction) will mean the removal of more speech and the potential suppression of legitimate discourse on incredibly important subjects, failing deadly (biasing towards freedom of expression) will allow for and potentially promote harmful content with real world consequences. Any system will be imperfect, but we can choose how some of those imperfections manifest. 

I am not going to express a viewpoint on this, I don't work directly in trust and safety and I am not a lawyer, but I like this framework for thinking about these issues and it's an easy connection to make between my hobbies and professional life. If you want to listen to vastly more competent people talk about these difficult issues I'd encourage you to check out the following podcasts and publications.

* [Moderated Content from Stanford Law School](https://law.stanford.edu/directory/evelyn-douek/moderated-content/) a podcast content about content moderation, moderated by assistant professor Evelyn Douek. The community standards of this podcast prohibit anything except the wonkiest conversations about the regulation—both public and private—of what you see, hear and do online.
* [Lawfare's Arbiters of Truth](https://www.lawfareblog.com/topic/arbiters-truth) an occasional Lawfare podcast series on the online information ecosystem featuring interviews with experts about the legal and policy aspects of the debates around political discourse, online speech and social media platforms. 


Books Mentioned in this post:
* [Command and Control: Nuclear Weapons, the Damascus Accident, and the Illusion of Safety  by Eric Schlosser ](https://www.goodreads.com/book/show/6452798-command-and-control?ac=1&from_search=true&qid=vKEvjiinaF&rank=1)
* [The Dead Hand: The Untold Story of the Cold War Arms Race and its Dangerous Legacy  by David E. Hoffman](https://www.goodreads.com/book/show/6623920-the-dead-hand?ref=nav_sb_ss_2_13)
