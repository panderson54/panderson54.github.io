---
title:  "Blockchain skepticism isn't being a Luddite: Part 1"
classes: wide
categories:
  - software
tags:
  - cryptography
  - blockchain
  - software
---

I'm not a blockchain guy. Having written that in the immutable ink of the internet I can have it forever held against me when we all eventually upload our collective consciousness onto the great ledger in the sky. Criticism, skepticism, or even gentle probing of the relevance of blockchain technologies in all facets of life is typically met with a mixture of shock and pity by its evangelists. That said I am not alone in my skepticism and there is a growing counter weight to the "common knowledge" that the blockchain will revolutionize everything.

I wanted to write down some of my thoughts on the facts, as I understand them, of distributed ledger tech and draw some conclusions. Unlike when writing about nukes, on this subject I don't have the shield of amateurism to protect me from my hot takes. I have a degree in computer science, I have been a professional software engineer for 8 years, and I should be generally better equipped than the average person off the street to understand these topics. If you disagree with my conclusions, do it with the happy knowledge that I should have known better. 

I am going to write this with the goal of being both accurate and understandable. That said accuracy means we are not going to gloss over some of the underlying computer science or cryptographic underpinnings of these systems. What's happening under the hood is what drives much of my skepticism. I'll try and quickly define relevant concepts but some tangential items are beyond our scope.


What is a Blockchain?
=====================

A Blockchain is a distributed ledger. Ledgers keep a chronological record of transactions between accounts, it's a concept as old as writing and ancient ledgers can give us fascinating glimpse into how people in the past lived. To put it obviously a blockchain is, as it sounds, a chain of blocks. Each block contains some data and a reference to the previous block in the chain. If you've studied computer science we have a name for this structure, it's called a linked list. 

![Linked List Diagram]({{ site.url }}{{ site.baseurl }}/assets/images/linkedlist.png)

One of the core components of a ledger is trust. When looking up an account in a ledger you look for that account's latest balance. Inherent in this operation is your trust that the ledger, up to this point, has kept an accurate accounting of all transactions such that the balance you see for any given account is accurate. The way we build trust into this structure is through cryptography, hence "crypto" being a moniker for these structures. 

Finally the "distributed" part of distributed ledgers is in how they are managed. Traditionally you have a single entity that is responsible for the upkeep of the ledger, this might be a bank or a government. The community relying on the ledger places their trust in that entity to determine if a transaction is valid (does Bob have 10 coins to pay Alice) and keep the ledger up to date. A distributed ledger does the opposite, it places the responsibility of validating transactions and adding valid transactions to the ledger onto the community. The core issues, and strengths, of distributed ledgers are in how they deal with this problem of trust.

So let's talk about how blockchains are put together focusing on the most famous of them, Bitcoin.

The structure of a block:
=========================

In the case of a Bitcoin's blockchain each block has a header that is made up of three main components (there are additional components):
* The previous blocks hash
* The current blocks data (in the form of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree))
* A nonce 
* Target hash

The first component is the hash of the previous block in the chain. This serves as a link to the rest of the ledger, in the linked list diagram above we'd call this a pointer as it points back down the chain. Hashes are the output of a hash function, these functions (think math formula) can take in multiple pieces of information and output a string (a series of characters) that is representative of the input but often shorter and of a fixed length. Hashes are used for a variety of reasons including storage and access of data and encryption. 

~~~~~~~~
1600 Pennsylvania Avenue NW
Washington, D.C. 20500
U.S.
~~~~~~~~

[SHA256 hash](https://en.wikipedia.org/wiki/SHA-2) of the above data:
~~~
2c76193c4ead6909afa629eda14e6d176dfddfdbb0ebad58c68dcbc8e14a19b4
~~~

Second we have the data of the current block, for Bitcoin this contains a list of transactions that are to be added to the ledger. Alice gives Bob 10 coins, Bob gives Kelly 2 coins etc.. Before being added to the ledger these transactions have to be validated, Alice can't give Bob 10 coins they don't have. Transaction validation is done by checking against previous 

Finally we have a nonce and the target hash. A nonce is a "Number Used Once", they are arbitrary numbers used a single time in cryptography. The target hash is a number (in hexadecimal) that the resulting hash of the block must be lower than. In blockchain's that use a proof of work system (like Bitcoin) the nonce combined with the target hash are the underpinning of the entire system. 

Trust:
=======
The integrity of the Bitcoin blockchain relies on an idea called "proof of work", this system relies on the difficulty of adding new blocks to the chain to keep the entire chain honest. 

>"Proof-of-work is essentially one-CPU-one-vote. The majority decision is represented by the longest chain, which has the greatest proof-of-work effort invested in it. If a majority of CPU power is controlled by honest nodes, the honest chain will grow the fastest and outpace any competing chains. To modify a past block, an attacker would have to redo the proof-of-work of the block and all blocks after it and then catch up with and surpass the work of the honest nodes."

\- *Bitcoin: A Peer-to-Peer Electronic Cash System*

The idea is that the effort required to add a new block containing a fraudulent transaction to the chain and then to keep adding new blocks such that your fraudulent transaction is on the longest chain is prohibitive. The work in this case is artificial, the actual validation of transactions is relatively trivial for a computer.

>"The proof-of-work involves scanning for a value that when hashed, such as with SHA-256, the hash begins with a number of zero bits. The average work required is exponential in the number of zero bits required and can be verified by executing a single hash."

\- *Bitcoin: A Peer-to-Peer Electronic Cash System*

This is where we get to cryptography, one way functions like SHA256 are designed such that determining the input from a given output is impossible short of guessing all possible inputs. Any change in the input will produce wildly different outputs meaning the guesser has no idea if they are close to or far from the original value. The only way to find a nonce that when included in the blocks data produces a hash of the correct value is to guess and check. Nonce's are 32 bits in size and can hold a value between 0 and 2^32.

To give you an idea of how much work goes into finding a valid hash currently:

~~~
Time = difficulty * (2^32) / hashrate
~~~

As of 4/1/2022 Bitcoin's difficulty is = 27,452,707,696,466  

Using a rough hashrate (this number depends on a lot of factors) for my computer of 30,000,000 guesses a second (30Mh/s) if I were the only person trying to find a valid hash it would take:

~~~
((((27,452,707,696,466 * 2^32) / (30,000,000)) /60) /60)/8760 =  124,628,447.64 years
~~~

It's important to remember that the number is years of computer work and that number has real world costs attached to it in terms of power consumption and hardware. Additionally difficulty is adjusted by the network every 2 weeks such that time = 10m/block, as more computing power works on the chain the difficulty must increase in order to keep the rate at 10m per block added.

In short, in order to insert a fraudulent transaction into the blockchain the fraudster not only needs to be faster than every other validator they need to keep being faster in order to maintain the longest chain. Unless a single entity controls > 50% of the computing power on a chain the blockchain should be secure. This is so incredibly difficult to do that the longest chain can be trusted based on the mathematical likelihood of its validity. 

Finally here is a summary of the entire trust workflow from the Bitcoin whitepaper:

> "The steps to run the network are as follows: 
> 1) New transactions are broadcast to all nodes.
> 2) Each node collects new transactions into a block. 
> 3) Each node works on finding a difficult proof-of-work for its block. 
> 4) When a node finds a proof-of-work, it broadcasts the block to all nodes. 
> 5) Nodes accept the block only if all transactions in it are valid and not already spent. 
> 6) Nodes express their acceptance of the block by working on creating the next block in the chain, using the hash of the accepted block as the previous hash."

\- *Bitcoin: A Peer-to-Peer Electronic Cash System*

So where are the coins?
=======================

We've established a few facts above:
* In order for the blockchain to be trustworthy, creating new blocks must meet a threshold of difficulty.
* Distributed ledgers require many nodes working together to be secure
* There are real world monetary costs to finding a valid hash

The question you should be asking is why would anyone want to run a node in this set up if it's going to consume power (and therefore money) and hardware to do so? The answer is that the first node that finds a valid hash gets to add one last transaction to the block, this is a bounty for validating the block and grants a coin to the validator. This is where the term "mining" comes from, new coins are mined/created every time a block is added to the chain as an incentive for people to run a node (or many nodes). 

So we've arrived at cryptocurrencies. A cryptocurrency is the incentive for individuals to contribute to the blockchain.

Wrapping up:
=============

There are a lot of things I've not even touched on such as:
* How difficulty is set and adjusted
* Nodes and how they coordinate/communicate
* How transactions are conducted and validated
* How data is stored and accessed on the chain
* Extra nonce and other steps for generating an valid hash aside from the nonce 
* There are other systems of trust used in other blockchains like proof of stake 
* Privacy
etc..

If you are interested in the inner workings of blockchains I would advise you to use sources that are as removed from the monetary aspects of the ecosystem as possible. I'd start with the source I've most referenced here which is the Bitcoin whitepaper. 

Now that we've laid the groundwork we're going to talk about why I don't think blockchain is the wave of the future next, and finally what blockchains might actually be useful for.

**Sources:**
* [Bitcoin Whitepaper - Satoshi Nakamoto](https://bitcoin.org/bitcoin.pdf)
* [CEE380 Talk - Dr. David Rosenthal](https://blog.dshr.org/2022/02/ee380-talk.html)
* [Computer Security 161 Cryptocurrency Lecture - Dr. Nicholas Weaver](https://www.youtube.com/watch?v=J9nv0Ol-R5Q)
* [But how does bitcoin actually work? - Youtube](https://www.youtube.com/watch?v=bBC-nXj3Ng4&t=37s)

**Good books on cryptography:**
* [Crypto by Steven Levy](https://www.goodreads.com/book/show/984428.Crypto?ac=1&from_search=true&qid=1r8JO4wv7r&rank=3)
* [The Code Book by Simon Singh](https://www.goodreads.com/book/show/17994.The_Code_Book?from_search=true&from_srp=true&qid=zkH5EUKNNd&rank=1)
* [Serious Cryptography: A Practical Introduction to Modern Encryption by Jean-Philippe Aumasson](https://www.goodreads.com/book/show/36265193-serious-cryptography?ac=1&from_search=true&qid=rxwHOXTPaI&rank=1)

