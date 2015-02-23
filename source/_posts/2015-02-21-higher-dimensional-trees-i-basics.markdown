---
layout: post
title: "Higher Dimensional Trees I - Basics"
date: 2015-02-21 16:21:58 -0800
comments: true
categories: 
---

Ever since I became interested in 
[homotopy type theory](http://www.homotopytypetheory.org), I've been 
fascinated by the idea that we can build interesting topological (or more
accurately, homotopy theoretic or higher categorical) objects out 
of pure logic.  In this first series of posts, I'm going to show 
you how some of the most basic datatypes of functional programming, 
lists and trees, are strikingly easy to extend into higher dimensions. 
All of this is very nicely described in the paper 
[Higher Trees, Algebraically](https://personal.cis.strath.ac.uk/neil.ghani/papers/ghani-calco07.pdf)
by Neil Ghani and Alexander Kurz, although I have repackaged it a
bit for simplicity and to suit my purposes in later posts.

I'll be giving the code samples in
[Agda](http://wiki.portal.chalmers.se/agda/pmwiki.php) since it is so
simple and concise, although I think what I say should be reasonably
clear to anyone with some functional programming experience.
Everything here is relatively easy to translate into any other modern
functional language such as Scala, OCaml or Haskell.

Let's get started!

<!--more-->

As usual with this kind of thing, it pays to work out the low
dimensional examples so that we can see exactly what we are trying to
generalize.  So, then, what is a zero dimensional tree?  Well, we
don't have too many choices: the only really meaningful geometric
objects around in dimension zero are points.  

But just as lists and trees can be labelled with elements of some type
(they are *type constructors*) we're going to want to label our points
with elements of some type.  With that in mind, the following definition
should serve our purposes:

``` agda

  data Point (A : Set) : Set where
    pt : A → Pt A

  samplePoint : Point ℕ
  samplePoint = pt 4

```

Now, astute readers will notice that this type is exceedingly boring since
`Point A` is clearly isomorphic to `A` itself.  Nevertheless, I'm going
to keep it around since it's useful for making the pattern clear.

If we were to draw a picture of an element of `Point ℕ`, like the
one in the code above, it would just look like this:

{% img center /images/hdts/point.png %}

So, moving on then, it probably won't surprise you to learn that a
one-dimensional tree is just a list.  Here's the definition I'm
going to use for lists:


``` agda

  data List (A : Set) : Set where
    nil  :                      List A
    cons : A → Point (List A) → List A

  sampleList : List ℕ
  sampleList = cons 3 (pt (cons 1 (pt (cons 2 (pt nil)))))

```

As you can see, I've done something sneaky: instead of the usual
definition of `cons`, I've stuck in that `Point` constructor from
above.  Since `Point (List A) = List A`, nothing has really 
changed, except that we're being a bit more verbose.  Now let's
look at the corresponding drawing for our little example list.  It
looks something like this:

{% img center /images/hdts/list.png %}

The little grey boxes here are meant to indicate that after a 
piece of data introduced by the `cons` constructor, the remaining
"branches" of our 1-dimensional tree are being organized by the 
`Point` datatype.  Since this type constructor is not very
interesting, we always have a unique branch just like we would
expect.

I'll just note that to be really precise, the boxes should extend over
the entire tail of the list (as is shown by the parentheses in our
term).  But this will be harder to draw in higher dimensions, so I'm
just going to content myself with what's above.  

Okay, so far so good.  Let's move on to trees, or what I'm going to
call 2-trees.  No surprises with the definition, it's just as usual:

```  agda

  data Tree (A : Set) : Set where
    leaf :                     Tree A
    node : A → List (Tree A) → Tree A

  sampleTree : Tree ℕ
  sampleTree = 
    node 9 (cons (node 8 (cons leaf (pt (cons leaf (pt nil)))))
       (pt (cons (node 4 nil)
       (pt (cons (node 2 (cons leaf (pt nil)))
       (pt nil)))))

```

At least now the picture is slightly more interesting:

{% img center /images/hdts/2tree.png %}

Notice how this time it's the `List` type constructor which controls
how our tree is allowed to branch.  Because we are allowed to have a
1-dimensional family of branches, the data itself is organized in
2-dimensions.  Moreover, it's useful to point out that our 2-trees are
*planar* in the sense that they pick up a canonical ordering of their
branches.

I hope I have now made it blindingly obvious how to continue on from
here.  A 3-tree, for example, will just have its branches organized by
a 2-tree.  And so on and so forth.  Using an indexed inductive type
(or GADT, if you prefer) we can get all the dimensions at once:

``` agda

  data Tree (A : Set) : ℕ → Set where
    pt : A → Tree A 0
    leaf : {n : ℕ} → Tree A (suc n)
    node : {n : ℕ} → A → Tree (Tree A (suc n)) n → Tree A (suc n)

```

Not surprisingly, the notation for terms starts to get more and more
unwieldy as you go higher and higher in dimension, but just to give an
example, here is a 3-tree:

``` agda

  sampleTree : Tree 3 ℕ
  sampleTree = node 6
               (node
                (node 12
                 (node leaf
                  (node (node leaf (node leaf (pt leaf)))
                   (pt (node (node leaf (node leaf (pt leaf))) (pt leaf))))))
                (node
                 (node (node 7 (node leaf (node leaf (pt leaf))))
                  (node leaf (pt leaf)))
                 (pt
                  (node
                   (node
                    (node 4
                     (node leaf (node (node leaf (node leaf (pt leaf))) (pt leaf))))
                    (node leaf (pt leaf)))
                   (pt leaf)))))

```

And here's what it looks like:

{% img center /images/hdts/3tree.png %}

In the next couple of posts, I'll start to develop some tools
for working with these types.  Then from there I'll try to explain
what all this has to do with higher category theory, and how
one might put these objects to good use.
