/*!
 * opetopic.js
 * MIT licensed
 *
 * Copyright (C) 2015 Eric Finster
 */

(function() {

    var Slides = [];

    var varColor = '#F6FAC5';
    var univColor = '#C9C5FA';
    var compColor =  '#FAC5DC';

    var dummySlide = {
	isFirstFrame: function() { return true; },
	isLastFrame: function() { return true; }
    }

    var createFrame = function(initFun, frmCnt, frmCmds) {

	return (function() {

	    var curFrame = 0;
	    var maxFrame = frmCnt - 1;
	    var frameCmds = frmCmds;

	    return {
		
		init: initFun,

		isFirstFrame: function() { return (curFrame == 0); },
		isLastFrame: function() { return (curFrame == maxFrame); },
		
		next: function() {
		    if (curFrame < maxFrame) {
			frameCmds[curFrame + 1](false);
			curFrame = curFrame + 1;
		    }
		},

		prev: function() {
		    if (curFrame > 0) {
			frameCmds[curFrame - 1](true);
			curFrame = curFrame - 1;
		    }
		}
		
	    }

	})();

    }

    var slideInOut = function(pref, i, j, pre, post) {
	$('#' + pref + '-' + j).fadeOut(400, function() {
	    if (pre != null) pre();
	    $('#' + pref + '-' + i).fadeIn(400);
	    if (post != null) post();
	});
    }

    //
    // Opetopic Diagrams Slide
    // 

    Slides[1] = (function() {

	var snap = Snap('#diagrams-canvas');

	var init = function() {

    	    Snap.load("tutorial/svg/basics.svg", function (f) {
    	  	snap.append(f);
    	    });

	};

	var frameCmds = {

	    0: function(rev) {

		snap.selectAll('text').animate({ opacity: '0.0' }, 400);
		if (rev) slideInOut('diags', 1, 2);

	    },

	    1: function(rev) {
		
		slideInOut('diags', 2, rev ? 3 : 1, function() {
		    snap.selectAll('text').animate({ opacity: '1.0' }, 400);
		    snap.select('#cell-773799263').animate({
			fill: 'white'
		    }, 500);
		});

	    },

	    2: function(rev) {
		if (! rev) {
		    slideInOut('diags', 3, 2, function() {
			snap.select('#cell-773799263').animate({
			    fill: 'lightcoral'
			}, 500);
		    });
		}
	    }
	};

	return createFrame(init, 3, frameCmds);

    }());

    //
    // Slide 2
    //

    Slides[2] = (function() {

	var snap = Snap('#zoom-canvas');

	var init = function() {
	    loadOpetope(snap, "tutorial/svg/gentil.svg", false, false);
	};

	var frameCmds = {

	    0: function(rev) {

	    	snap.select("#left-panels").animate({ opacity: "1.0" }, 500);
	    	snap.select("#right-panels").animate({ opacity: "1.0" }, 500);
	    	snap.select("#mid-panels").animate({ transform: "scale(1)" }, 500);

		if (rev) slideInOut('zoom', 1, 2);

	    },

	    1: function(rev) {

	    	snap.select("#left-panels").animate({ opacity: "0.0" }, 500);
	    	snap.select("#right-panels").animate({ opacity: "0.0" }, 500);
	    	snap.select("#mid-panels").animate({ transform: "scale(1.12) translate(-25, -15)" }, 500);
	    	snap.selectAll(".panel-dim-2 path").animate({ opacity: "1.0" }, 500);
	    	snap.selectAll(".panel-dim-3 rect").animate({ opacity: "1.0" }, 500);

		slideInOut('zoom', 2, rev ? 3 : 1);

	    },

	    2: function(rev) {

	    	snap.selectAll(".panel-dim-2 path").animate({ opacity: "0.0" }, 500);
	    	snap.selectAll(".panel-dim-3 rect").animate({ opacity: "0.0" }, 500);
	    	snap.selectAll("text").animate({ opacity: "0.0" }, 500);

		slideInOut('zoom', 3, rev ? 4 : 2);

	    },

	    3: function(rev) {

	    	snap.selectAll("text").animate({ opacity: "1.0" }, 500);

		slideInOut('zoom', 4, rev ? 5 : 3);

	    },

	    4: function(rev) {

	    	snap.select("#left-panels").animate({ opacity: "1.0" }, 500);
	    	snap.select("#right-panels").animate({ opacity: "1.0" }, 500);
	    	snap.select("#mid-panels").animate({ transform: "scale(1)" }, 500);

	    	snap.selectAll("text").animate({ opacity: "0.0" }, 500);

	    	snap.selectAll(".panel-dim-2 path").animate({ opacity: "1.0" }, 500);
	    	snap.selectAll(".panel-dim-3 rect").animate({ opacity: "1.0" }, 500);

		slideInOut('zoom', 5, rev ? 6 : 4);

	    },

	    5: function(rev) {

		if (! rev) slideInOut('zoom', 6, 5);

	    }
	}

	return createFrame(init, 6, frameCmds);

    }());

    //
    // Slide 3
    //

    Slides[3] = (function() {

    	var snap = Snap('#faces-canvas');

    	var init = function() {
    	    loadOpetope(snap, "tutorial/svg/gentil.svg", true, false);
    	};

	var highlightFace = function(id) {

	    var faces = snap.select(id).data('faces');

    	    for (var fn = 0; fn < faces.length; fn++) {
    		if (faces[fn] != null) {
    		    faces[fn].animate({ fill: "lightcoral" }, 500);
    		}
    	    }

	}

	var dehighlightFace = function(id) {

	    var faces = snap.select(id).data('faces');

    	    for (var fn = 0; fn < faces.length; fn++) {
    		if (faces[fn] != null) {
    		    faces[fn].animate({ fill: "white" }, 500);
    		}
    	    }

	}

    	var frameCmds = {

    	    0: function(rev) {
		dehighlightFace('#cell-418586223');
		if (rev) slideInOut('faces', 1, 2)
    	    },

	    1: function(rev) {
		highlightFace('#cell-418586223');
		if (!rev) slideInOut('faces', 2, 1);
	    }

    	};

    	return createFrame(init, 2, frameCmds);

    }());

    //
    // Slide 4
    //

    Slides[4] = (function() {

    	var snap = Snap('#proofs-canvas');

    	var init = function() {
    	    loadOpetope(snap, "tutorial/svg/proofs.svg", false, true, function() {
	    });
    	};

	var frameCmds = {

	    0: function(rev) {
	    },

	};

    	return createFrame(init, 1, frameCmds);

    }());

    var createEckHiltFrame = function(i, ucell, dcell, cb) {

	var snap = Snap('#eck-' + i + '-canvas');
	
    	var init = function() {

    	    loadOpetope(snap, 'tutorial/svg/eck-hilt-' + i + '.svg', true, true, function() {

		snap.select('#cell-' + ucell).
		    removeClass('expr-bdry-thin').
		    attr({ fill: 'white' });

		snap.select('#cell-label-' + ucell).
		    attr({ opacity: '0.0' });

		snap.select('#cell-' + dcell).
		    removeClass('expr-filler').
		    attr({ fill: 'white' });

		snap.select('#cell-label-' + dcell).
		    attr({ opacity: '0.0' });
		
		if (cb != null) cb(snap);

	    })

    	};

    	var frameCmds = {

    	    0: function(rev) {

		snap.select('#cell-' + ucell).
		    removeClass('expr-bdry-thin').
		    animate({ fill: 'white' }, 500);

		snap.select('#cell-label-' + ucell).
		    animate({ opacity: '0.0' }, 500);

		snap.select('#cell-' + dcell).
		    removeClass('expr-filler').
		    animate({ fill: 'white' }, 500);

		snap.select('#cell-label-' + dcell).
		    animate({ opacity: '0.0' }, 500);

    	    },

	    1: function(rev) {

		snap.select('#cell-' + ucell).
		    addClass('expr-bdry-thin').
		    animate({ fill: univColor }, 500);

		snap.select('#cell-label-' + ucell).
		    animate({ opacity: '1.0' }, 500);

		snap.select('#cell-' + dcell).
		    addClass('expr-filler').
		    animate({ fill: univColor }, 500);

		snap.select('#cell-label-' + dcell).
		    animate({ opacity: '1.0' }, 500);

	    }

    	};

    	return createFrame(init, 2, frameCmds);

    };


    //
    // Eckmann-Hilton Slides
    //

    Slides[5] = createEckHiltFrame('1', '1061477328', '95768052', function(snap) {
	snap.select('#eck-hilt-1-grp').attr({ transform: 'scale(.75)' });
    });

    Slides[6] = createEckHiltFrame('2', '1773477803', '1915898308', function(snap) {
	snap.select('#eck-hilt-2-grp').attr({ transform: 'scale(.85)' });
    });

    Slides[7] = createEckHiltFrame('3', '2135267151', '1296705742', function(snap) {
	snap.select('#eck-hilt-3-grp').attr({ transform: 'scale(.95)' });
    });

    Slides[8] = createEckHiltFrame('4', '129223021', '745346830', function(snap) {
	snap.select('#eck-hilt-4-grp').attr({ transform: 'scale(.75)' });
    });

    Slides[9] = createEckHiltFrame('5', '1929078963', '1469512382', function(snap) {
	snap.select('#eck-hilt-5-grp').attr({ transform: 'scale(.75)' });
    });

    Slides[10] = createEckHiltFrame('6', '1418736723', '1486790133', function(snap) {
	snap.select('#eck-hilt-6-grp').attr({ transform: 'scale(.70)' });
    });

    var loadOpetope = function(s, fname, highlight, showLabels, clbck) {

    	// Use snap to load the fragment
    	Snap.load(fname, function (f) {

    	    f.selectAll("rect").forEach(function(r) {

    	        var faces = [];
    	        var faceNodes = r.node.getElementsByTagName("opetopic:face");

                for (var fn = 0; fn < faceNodes.length; fn++) {
    		    faces[fn] = f.select("#cell-" + faceNodes[fn].textContent);
                }

    		r.data('faces', faces);
		r.attr({ fill: 'white' , stroke: 'black' , strokeWidth: '2px' })

    		if (highlight) {

    		    r.mouseover(function () {
    			for (var fn = 0; fn < faces.length; fn++) {
    			    if (faces[fn] != null) {
				if (faces[fn].hasClass('expr-var')) {
    				    faces[fn].attr({ fill: '#C8CCA1' });
				} else if (faces[fn].hasClass('expr-filler')) {
    				    faces[fn].attr({ fill: '#A5A1CC' });
				} else if (faces[fn].hasClass('expr-bdry')) {
    				    faces[fn].attr({ fill: '#CCA1B3' });
				} else if (faces[fn].hasClass('expr-bdry-thin')) {
    				    faces[fn].attr({ fill: '#A5A1CC' });
				} else {
    				    faces[fn].attr({ fill: 'lightcoral' });
				}
    			    }
    			}
    		    });

    		    r.mouseout(function () {
    			for (var fn = 0; fn < faces.length; fn++) {
    			    if (faces[fn] != null) {
				if (faces[fn].hasClass('expr-var')) {
    				    faces[fn].attr({ fill: '#F6FAC5' });
				} else if (faces[fn].hasClass('expr-filler')) {
    				    faces[fn].attr({ fill: '#C9C5FA' });
				} else if (faces[fn].hasClass('expr-bdry')) {
    				    faces[fn].attr({ fill: '#FAC5DC' });
				} else if (faces[fn].hasClass('expr-bdry-thin')) {
    				    faces[fn].attr({ fill: '#C9C5FA' });
				} else {
    				    faces[fn].attr({ fill: 'white' });
				}
    			    }
    			}
    		    });

    		}

    	    });

    	    if (! showLabels) {
    		f.selectAll("text").attr({ opacity: "0.0" });
    	    }

	    // Set up expression coloring.
	    f.selectAll(".expr-var").attr({ fill: '#F6FAC5' });
	    f.selectAll(".expr-filler").attr({ fill: '#C9C5FA' });
	    f.selectAll(".expr-bdry").attr({ fill: '#FAC5DC' });
	    f.selectAll(".expr-bdry-thin").attr({ fill: '#C9C5FA' });

    	    s.append(f);

	    if (clbck != null) clbck();

    	});
	
    }
    

    //
    //  Reveal initialization and event handling
    //

    Reveal.initialize({

        controls: true,
        progress: true,
        history: true,
        center: true,

        transition: 'slide', // none/fade/slide/convex/concave/zoom

    });

    var currentSlide = dummySlide;

    Reveal.addEventListener('ready', function(event) {
	
        var startSlide = Reveal.getIndices().h;

	if (Slides[startSlide] != null) { 
	    currentSlide = Slides[startSlide];
	}

        for (i = 0; i < Reveal.getTotalSlides(); i++) {

	    // Pass a boolean to say if we start on the
	    // first or last subframe
    	    if (Slides[i] != null) {
    		Slides[i].init(i >= startSlide);
    	    }

    	};

    });

    var opetopicNext = function() {
	if (currentSlide.isLastFrame()) {

	    Reveal.next();

	    var i = Reveal.getIndices().h;
	    currentSlide = (Slides[i] != null) ? Slides[i] : dummySlide;

	} else {
	    currentSlide.next();
	}
    }

    var opetopicPrev = function() {
	if (currentSlide.isFirstFrame()) {

	    Reveal.prev();

	    var i = Reveal.getIndices().h;
	    currentSlide = (Slides[i] != null) ? Slides[i] : dummySlide;

	} else {
	    currentSlide.prev();
	}
    }

    Reveal.configure({
	keyboard: {
	    37: opetopicPrev,
	    39: opetopicNext
	}
    });

}());
