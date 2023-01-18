---
title:  "Let's talk Crypto[graphy]"
classes: wide
categories:
  - software
tags:
  - cryptography
  - software
---
![Git History Banner]({{ site.url }}{{ site.baseurl }}/assets/images/RSA_key_banner.png)

Cryptography, while increasingly in the news, is not something most people think about affecting their day to day lives. I believe cryptography is something that more people should be passingly familiar with, knowingly or not you have placed a great deal of trust in modern cryptography. The art of code making and code breaking has been the primary enabler of the wholesale move of many facets of life online. From online banking, social media, shopping, medical records and increasingly your communications with family and friends are able to be transmitted and stored securely thanks to the ubiquity of very strong cryptography. That also means you, dear reader, have a vested interest in the encryption protecting your assets remaining strong. 

The desire of people to keep secrets, and to read the secrets of others, is an urge that has helped shape events for thousands of years. We can find uses of codes and ciphers dating back thousands of years, generals, kings, advisors, spies and diplomats all needed ways to communicate safely without fear of their message being read by prying eyes. The word cryptography comes from the Greek word kryptos meaning hidden. Cryptography is the practice of hiding the meaning of a message, not the message itself. The process by which this is done is called encryption, the aim of encryption is to take a message and render it unintelligible to all but the intended recipient. Anyone who reads an encrypted message that does not know how the message was scrambled will be unable to decipher it. 

BASICS
=====================

Encryption falls into two general camps, transposition, the act of moving characters around, and substitution, the act of swamping one character for another in the alphabet. 

Some quick terminology:
Plaintext: The unscrambled, original, message. 

Ciphertext: Then scrambled message, this is the result of using an encryption process on a plaintext. 

Algorithm: The method by which something is encrypted

Key: The details of a particular  encryption, this could be the number of places a letter is shifted or the substitution alphabet (aka a cipher alphabet).  

![A great diagram provided by Simon Singh in The Code Book]({{ site.url }}{{ site.baseurl }}/assets/images/singh_diagram.png)

Classic examples of both types are rail fence cypher (transposition) and the Caesar cipher (substitution). Both are quite simple, the rail fence involves creating two strings from alternating letters and then combining the two strings as a ciphertext. 

~~~
Plaintext: THIS IS  A SECRET:
String 1: T I I A E R T
String 2:  H S S S C E
Ciphertext: TIIAERTHSSSCE
~~~

The Caesar cipher is similarly simple, it involves shifting the alphabet a predetermined number of spaces and substituting the letters of the plaintext with the letters in the cipher alphabet. The classic example, used by Caesar himself, was 3 places. 

~~~
Plain Alphabet:    ABCDEFGHIJKLMNOPQRSTUVWXYZ 
Cipher Alphabet: XYZABCDEFGHIJKLMNOPQRSTUVW 
Plaintext: THIS IS A SECRET
Ciphertext: WKLV LV D VHFUHW
~~~

You are probably familiar with these from grade school, they are fun, easy to learn and use and for thousands of years were state of the art. Both of these are kept secret not by knowing the algorithm by which they were encrypted but by the key used to do the encryption. This brings us to a core tenet of cryptography, know as Kerckhoff's principle, which can be paraphrased as:

>A cryptosystem should be secure, even if everything about the system, except the key, is public knowledge.

The assumption is that a potential snooper can know everything about how a message was encrypted, except the key, and they will be no closer to the plaintext. This is core to how all modern encryption works. When data is sent securely over the internet, anyone can intercept those messages but only the person holding the proper key can actually read them. 

HISTORY
=========================

We are all familiar with famous historical examples like Enigma from World War 2, the Zimmerman Telegram, or Mary Queen of Scots' hidden messages to her supporters. But the stories that are told about these uses of cryptography are not how effective they were but rather how they were broken.

Code breaking books date back to 9th century Baghdad where Arab thinkers such as Al-Kindi (author of A Manuscript on Deciphering Cryptographic Messages) pioneered the field of cryptanalysis. Al-Kindi wrote about a method now known as frequency analysis, this is a method that uses linguistics and statistics to determine how a given letter was substituted based on the frequency of that letter's occurrence. In any language some letters occur more than others, in english e is the most commonly used letter, by taking a ciphertext and counting the occurrence of each letter a code breaker can start to reveal the underlying key. 

The Arab codebreakers kicked off a cycle of attack and defense that lasts to this day, at various points in history one side or the other has held the upper hand. Following the breaking of simple substitution and transposition ciphers there was a period of relatively little secrecy with code breakers able to read secret messages with impunity (provided you had a code breaker on staff that is, not exactly a common medieval profession). This battle has continued throughout history, Phelippes vs Mary Queen of Scots, Babbage & Kasiski vs the Vignere Cipher, ADFGX vs Painvin and Turing vs Enigma. During some periods cryptographers had the upper hand but for the most part search for an unbreakable code was driven by cryptanalysts ability to break codes with great and great efficiency. This all culminates in the invention of a truly unbreakable, and truly unwieldy, form of encryption called a One-Time Pad (OTP). 

OTP
=======
Rules for unbreakable cryptography:
* The key must be at least as long as the plaintext.
* The key must be random 
* The key must never be reused in whole or in part.
* The key must be kept completely secret by the communicating parties.

These rules describe a technique called a One-Time Pad, this is essentially a substitution cipher that uses a cipher alphabet made of entirely random letters once and then never again. The only instances of one-time pads being broken involved American cryptanalysts sifting through burned scraps of Soviet one-time pads and after painstaking work finding that the soviet cryptographers had messed up and reused some pads.

Randomness is key here, random number generators found in standard programming libraries are not sufficiently random for this purpose. In brief the number of bits of entropy in the cipher alphabet must be equal to the bits in the plain text. Specific methods for truly random number generation are complex and beyond our scope but they're interesting and you should look them up. Now this all sounds great, congrats everyone we have unbreakable codes! 

Well yes and no. If the key must be as long as the plaintext and you can secretly get a key to someone why not just send the plaintext? Additionally the total number of plaintext characters you can send is limited to the number of characters on the pads after that a new pad must be created and distributed. Modern encryption algorithms trade some security for usability at scale. One time pads are still very much used but their requirements for physical security and transportation of the pad make them impractical for general use or use between parties that don't already know each other. 

The age of computing has created a revolution in cryptography with modern cryptosystems becoming incredibly complex and math heavy. Modern cryptography measures its strength in millennia of computing time needed to brute force a given key. They are not 'perfect' in the same way that an OTP can be; modern cryptosystems' strength is that the work required to break them is simply unobtainable (for most actors). At least until the next great leap in computing is made the defense currently has the high ground. 

This last problem is what needs to be solved for secure communication to be useful in the internet age. How do two people who don't know each other and who are communicating on open channels do so securely? 

MEET ALICE, BOB, AND EVE 
=======================

The entire story about how this was solved is fascinating and I encourage you to read both Steven Levy's book Crypto about the development of Key Exchanges, PGP, and RSA. The story involves MIT, British spies from GCHQ, American spooks at Ft. Mead, and some radical dudes in California.  

What we know about encryption so far is that keeping a key secret is the most important part of keeping a message secure, but keys are needed to encrypt and decrypt a message which is something both parties need. The solution is called public key cryptography and the problem was solved in two ways by two different teams on opposite coasts of the US around the same time. Here are the two initial approaches: 

* Two parties establish a shared key independently prior to sending information that needs to be secured.
* Everyone brings their own lock and their own key

The solution to both of these comes down to math. There is a mathematical concept called a one-way function, this is a function that is very easy to compute in one direction and very difficult to invert. Given the output of one of these functions you are (practically) unable to determine what the inputs are.* 

Diffie-Hellman Key Exchange
-----------------------------	

Diffie-Hellman Key Exchange allows two people to develop a shared secret key while never communicating that secret key between one another. The shared key is then used to encrypt and decrypt messages between the two parties. The development of the shared key is easily illustrated as follows:

![Wikipedia DHKE paint example]({{ site.url }}{{ site.baseurl }}/assets/images/dhke_wikipedia.png)

~~~
1) Both communicate in the open to choose some base numbers for their shared function p and g
2) Alice selects a secret number a and computes A = g^a mod p
3) Alice selects a secret number b and computes B = g^b mod p
4) Alice sends Bob A in the clear 
5) Bob sends Alice B in the clear
6) Alice computes S = B^a mod p 
7) Bob computes S = A^b mod p 
8) Both now have secret key S
~~~

The underlying one-way function at work here is called the Diffie-Hellman Problem. Our eves dropper, Eve, does not have enough information, even if they monitor the entire exchange, to compute the key S. 

Diffie-Hellman is still widely used in various permutations and parts of it are how apps like Signal and WhatsApp secure their communications (aka the Signal protocol). The disadvantage of Diffie-Hellman is that  symmetric key encryption is that it is generally less secure than asymmetric key encryption and that it is not asynchronous.

RSA
----
RSA attacks this problem in a different way, what if everyone distributed their own locks for free but kept their keys private? There is a subset of one-way functions called trapdoor functions, a trapdoor function is a one-way function that has once caveat, there exists an additional value (the trapdoor) that makes determining the original values trivial. This trapdoor function is key to what is known as asymmetric key encryption.

Asymmetric keys have two components: a public key used for encrypting data and a private key for decrypting data. Everything talked about previously would fall into the category of symmetric key encryption where both parties use a single shared key. The private key is our trapdoor and must be kept secret, but the public key can be shared to anyone who wants to send you a message. Messages encrypted using your public key can only be decrypted by your private key. The exchange works as follows:

~~~
1) Alice wants to send Bob a message 
2) Alice requests Bob's public key 
3) Bob sends Alice his private key in the open
3) Alice write's her message to Bob and encrypts it using Bob's public key 
4) Bob receives Alice's encrypted message and decrypts using his private key 
~~~

RSA relies on the Prime Factorization Problem for it's security, simply put it's very difficult to find the factors from the product of two very large prime numbers. In this case Eve has Alice and Bob's public keys but no information about their private key and thus cannot read their messages.

Asymmetric key encryption is generally viewed as very secure but it's a slower process and thus not suitable for all use cases. Asymmetric key encryption also has a major advantage because it does not require the active exchange of data  (provided you already know someone's public key) it can be used asynchronously.

/* The actual existence of one-way functions is a point of academic mathematical debate that given I barely made it through my required calculus classes I am woefully ill equipped to explain. 


END
=============

Cryptography is fascinating both for its history and for its modern advancements. Without public key cryptography the modern secure communications that power our everyday lives would simply not be possible. Ubiquitous secure communications also have a lot of civil implications. We've seen spats between the FBI and tech companies like Apple due to their secure devices. The US Government has a long history of limiting the export of cryptographic tools (under ITAR) lest it harm their ability to gather intelligence internationally. Some countries have key escrow services where keys are held by a 'trusted' third party and eligible to be seized by the government should they deem it necessary to read certain communications. The security of data and how it's transported, stored, and secured should be of interest to all of us. If you're interested in learning more I would point you to the main sources for this post.


**Sources:**
* [Crypto by Steven Levy](https://www.goodreads.com/book/show/984428.Crypto?ac=1&from_search=true&qid=1r8JO4wv7r&rank=3)
* [The Code Book by Simon Singh](https://www.goodreads.com/book/show/17994.The_Code_Book?from_search=true&from_srp=true&qid=zkH5EUKNNd&rank=1)
* [Serious Cryptography: A Practical Introduction to Modern Encryption by Jean-Philippe Aumasson](https://www.goodreads.com/book/show/36265193-serious-cryptography?ac=1&from_search=true&qid=rxwHOXTPaI&rank=1)
* [Diffie-Hellman Key Exchange - Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)
* [RSA - Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem))

