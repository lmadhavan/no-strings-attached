var PI2 = Math.PI / 2;
var NV = 50;
var PS = 20, NPX = 640 / PS, NPY = 480 / PS, PPX = 2 * Math.PI / NPX, PPY = 2 * Math.PI / NPY;

var _t, _fe, _fid = null, _fi, _fn, _fcallback;

function $(id) {
	return document.getElementById(id);
}

function show(e) {
	e.style.display = 'block';
}

function hide(e) {
	e.style.display = 'none';
}

function _fadeIn() {
	var o = _fi / _fn;
	_fe.style.opacity = o;
	_fe.style.filter = 'alpha(opacity=' + (o * 100) + ')';
	if (_fi++ >= _fn) {
		clearInterval(_fid);
		_fid = null;
		if (_fcallback != null) _fcallback();
	}
}

function fadeIn(elem, time, callback) {
	if (_fid != null) clearInterval(_fid);
	_fe = elem;
	_fi = 0;
	_fn = time / 50;
	_fcallback = callback;
	show(_fe);
	_fid = setInterval(_fadeIn, 50);
	_fadeIn();
}

function _fadeOut() {
	var o = 1 - _fi / _fn;
	_fe.style.opacity = o;
	_fe.style.filter = 'alpha(opacity=' + (o * 100) + ')';
	if (_fi++ >= _fn) {
		clearInterval(_fid);
		_fid = null;
		hide(_fe);
		if (_fcallback != null) _fcallback();
	}
}

function fadeOut(elem, time, callback) {
	if (_fid != null) clearInterval(_fid);
	_fe = elem;
	_fi = 0;
	_fn = time / 50;
	_fcallback = callback;
	_fid = setInterval(_fadeOut, 50);
	_fadeOut();
}

function clear(p) {
	var e = p.firstChild;
	while (e != null) {
		n = e.nextSibling;
		p.removeChild(e);
		e = n;
	}
}

var text = [ '&ldquo;No Strings Attached&rdquo;', 'A JavaScript Demo' ];
var id1, i1;
var id2, i2;
var t1, t2;

function introText() {
	e = $('introText');
	e.innerHTML = text[i1];

	fadeIn(e, 1500, function() {
		setTimeout(function() {
			fadeOut(e, 1500, function() {
				if (++i1 == text.length) {
					clearInterval(id1); id1 = null;

					fadeOut($('intro'), 3000, function() {
						clearInterval(id2); id2 = null;
						bounce();
					});
				}
			});
		}, 3000);
	});
}

function introMove() {
	i2++;
	$('intro').style.backgroundPosition = -i2 + 'px 0';
}

function intro() {
	i1 = 0; id1 = setInterval(introText, 8000);
	i2 = 0; id2 = setInterval(introMove, 50);
	fadeIn($('intro'), 3000, null);
}

function ball() {
	if (i1 < 280) {
		e = $('ball');
		t = ((i1 * 2) % 80) / 10;
		if (parseInt((i1 * 2) / 80) % 2 == 0)
			d = 5 * t * t;
		else
			d = 320 - (80 * t - 5 * t * t);
		e.style.top = d + 'px';
		if (d > 280)
			e.style.height = (480 - d) + 'px';
		else
			e.style.height = '200px';

		if (i1 == 260)
			fadeOut($('bounce'), 1000, function() {
				clearInterval(id1); id1 = null;
				bobs();
			});

		i1++;
	}
}

function bounce() {
	i1 = 0; id1 = setInterval(ball, 50);
	fadeIn($('bounce'), 1000, null);
}

function plotBob() {
	p = $('default');

	if (i1 < 1100) {
		t = i1 / 150;
		e = document.createElement('div');
		e.setAttribute('class', 'bob');
		e.style.left = (p.offsetLeft + 320 + 280 * Math.sin(3 * t + PI2)) + 'px';
		e.style.top = (p.offsetTop + 240 + 200 * Math.sin(2 * t)) + 'px';
		e.style.backgroundColor = 'rgb(255, ' + (128 - parseInt(i1 * 0.085)) + ', 0)';
		p.appendChild(e);

		if (i1 == 1000)
			fadeOut(p, 1000, function() {
				clearInterval(id1); id1 = null;
				clear(p);
				threeD();
			});

		i1++;
	}
}

function bobs() {
	i1 = 0; id1 = setInterval(plotBob, 25);
	fadeIn($('default'), 1000, null);
}

function _3Dproject(p, e, xyz) {
	z = xyz[2];
	x = xyz[0] / z;
	y = xyz[1] / z;
	r = 50 / z;

	e.style.left = (p.offsetLeft + 320 + 320 * x - r / 2) + 'px';
	e.style.top = (p.offsetTop + 240 - 240 * y - r / 2) + 'px';
	e.style.width = e.style.height = r + 'px';
}

function _3Dtranslate(xyz, dx, dy, dz) {
	return [ xyz[0] + dx, xyz[1] + dy, xyz[2] + dz ];
}

function _3DrotateY(xyz, angle) {
	sin = Math.sin(angle);
	cos = Math.cos(angle);

	return [ xyz[0] * cos + xyz[2] * sin, xyz[1], -xyz[0] * sin + xyz[2] * cos ];
}

function _3Dinterp(xyz1, xyz2, alpha) {
	return [ xyz1[0] * alpha + xyz2[0] * (1 - alpha), xyz1[1] * alpha + xyz2[1] * (1 - alpha), xyz1[2] * alpha + xyz2[2] * (1 - alpha) ];
}

function transform3D() {
	p = $('default');

	if (i1 < 1050) {
		e = p.firstChild;
		i = i1 / 50;

		if (i1 < 300)

		while (e != null) {
			_3Dproject(p, e, [ Math.sin(i * 3), i / 10 - 1.5, Math.cos(i * 3) + 2.5 ]);
			//_3Dproject(p, e, [ Math.sin(i * 3), i / 75 - 0.75, Math.cos(i * 3) + 2.5 ]);

			e = e.nextSibling;
			i++;
		}

		else if (i1 < 400)

		while (e != null) {
			_3Dproject(p, e, _3Dinterp([ Math.sin(i * 3), i / 10 - 1.5, Math.cos(i * 3) + 2.5 ], [ Math.sin(i + PI2) + Math.cos(i1 / 10) / 3, Math.cos(i1 / 20), Math.sin(2 * i) + Math.sin(i1 / 10) / 3 + 2.5 ], (400 - i1) / 100));

			e = e.nextSibling;
			i++;
		}

		else if (i1 < 650)

		while (e != null) {
			_3Dproject(p, e, [ Math.sin(i + PI2) + Math.cos(i1 / 10) / 3, Math.cos(i1 / 20), Math.sin(2 * i) + Math.sin(i1 / 10) / 3 + 2.5 ]);

			e = e.nextSibling;
			i++;
		}

		else if (i1 < 750)

		while (e != null) {
			_3Dproject(p, e, _3Dinterp([ Math.sin(i + PI2) + Math.cos(i1 / 10) / 3, Math.cos(i1 / 20), Math.sin(2 * i) + Math.sin(i1 / 10) / 3 + 2.5 ], [ Math.sin(3 * i + PI2) + Math.cos(i1 / 10) / 3, -1, Math.sin(4 * i) + Math.sin(i1 / 10) / 3 + 2.5 ], (750 - i1) / 100));

			e = e.nextSibling;
			i++;
		}

		else

		while (e != null) {
			_3Dproject(p, e, [ Math.sin(3 * i + PI2) + Math.cos(i1 / 10) / 3, -1, Math.sin(4 * i) + Math.sin(i1 / 10) / 3 + 2.5 ]);

			e = e.nextSibling;
			i++;
		}


		if (i1 == 1000)
			fadeOut(p, 1000, function() {
				clearInterval(id1); id1 = null;
				clear(p);
				plasma();
			});

		i1++;
	}
}

function threeD() {
	p = $('default');
	for (i = 0; i < NV; i++) {
		e = document.createElement('img');
		e.src = 'sphere.png';
		e.style.position = 'fixed';
		p.appendChild(e);
	}

	i1 = 0; id1 = setInterval(transform3D, 50);
	fadeIn($('default'), 1000, null);
}

function _rgbstring(r, g, b) {
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function animatePlasma() {
	p = $('default');

	if (i1 < 360) {
		e = p.firstChild;
		k = 0;

		if (i1 < 120)

		while (e != null) {
			i = k / NPY;
			j = k % NPY;
			g = parseInt((Math.sin((i+j+i1) * PPX) + Math.sin(i * PPX) * Math.cos(j * PPY) + 2) * 63);
			e.style.backgroundColor = _rgbstring(g, g >> 1, g >> 1);

			e = e.nextSibling;
			k++;
		}

		else if (i1 < 240)

		while (e != null) {
			i = k / NPY;
			j = k % NPY;
			g = parseInt((Math.sin((i*j+i1*2) * PPX) + Math.sin(i * PPX) * Math.cos(j * PPY) + 2) * 63);
			e.style.backgroundColor = _rgbstring(g >> 2, g >> 1, g);

			e = e.nextSibling;
			k++;
		}

		else

		while (e != null) {
			i = k / NPY;
			j = k % NPY;
			g = parseInt((Math.sin(((i+j)*i1/3) * PPX) + Math.sin(i * PPX) * Math.cos(j * PPY) + 2) * 63);
			e.style.backgroundColor = _rgbstring(g, 0, g >> 1);

			e = e.nextSibling;
			k++;
		}

		if (i1 == 350)
			fadeOut(p, 1000, function() {
				clearInterval(id1); id1 = null;
				clear(p);
				credits();
			});

		i1++;
	}
}

function plasma() {
	p = $('default');
	show(p);
	for (i = 0; i < NPX; i++)
		for (j = 0; j < NPY; j++) {
			e = document.createElement('div');
			e.setAttribute('class', 'plasma');
			e.style.left = (p.offsetLeft + i * PS) + 'px';
			e.style.top = (p.offsetTop + j * PS) + 'px';
			p.appendChild(e);
		}

	i1 = 0; id1 = setInterval(animatePlasma, 100);
	fadeIn($('default'), 1000, null);
}

function scrollCredits() {
	if (i1 < 450) {
		$('credits').style.marginTop = (500 - i1) + 'px';
		i1 += 2;
	} else {
		clearInterval(id1); id1 = null;
	}
}

function credits() {
	i1 = 0; id1 = setInterval(scrollCredits, 50);
	fadeIn($('credits'), 500, null);
}

function init() {
	_t = 0;
	//setInterval(function() { $('debug').innerHTML = ++_t; }, 1000);

	intro();
	//bounce();
	//bobs();
	//threeD();
	//plasma();
	//credits();	
}
