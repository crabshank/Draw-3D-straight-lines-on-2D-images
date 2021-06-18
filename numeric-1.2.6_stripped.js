"use strict";
var numeric = {};

	numeric.rep = function(t, n, r) {
		typeof r == "undefined" && (r = 0);
		var i = t[r],
			s = Array(i),
			o;
		if (r === t.length - 1) {
			for (o = i - 2; o >= 0; o -= 2) s[o + 1] = n, s[o] = n;
			return o === -1 && (s[0] = n), s
		}
		for (o = i - 1; o >= 0; o--) s[o] = numeric.rep(t, n, r + 1);
		return s
	};
	
	numeric.LU = function(e, t) {
		t = t || !1;
		var n = Math.abs,
			r, i, s, o, u, a, f, l, c, h = e.length,
			p = h - 1,
			d = new Array(h);
		t || (e = /*numeric.clone(e)*/ JSON.parse(JSON.stringify(e)));
		for (s = 0; s < h; ++s) {
			f = s, a = e[s], c = n(a[s]);
			for (i = s + 1; i < h; ++i) o = n(e[i][s]), c < o && (c = o, f = i);
			d[s] = f, f != s && (e[s] = e[f], e[f] = a, a = e[s]), u = a[s];
			for (r = s + 1; r < h; ++r) e[r][s] /= u;
			for (r = s + 1; r < h; ++r) {
				l = e[r];
				for (i = s + 1; i < p; ++i) l[i] -= l[s] * a[i], ++i, l[i] -= l[s] * a[i];
				i === p && (l[i] -= l[s] * a[i])
			}
		}
		return {
			LU: e,
			P: d
		}
	};
	
	numeric.LUsolve = function(t, n) {
		var r, i, s = t.LU,
			o = s.length,
			//u = numeric.clone(n),
			u=JSON.parse(JSON.stringify(n));
			var a = t.P,
			f, l, c, h;
		for (r = o - 1; r !== -1; --r) u[r] = n[r];
		for (r = 0; r < o; ++r) {
			f = a[r], a[r] !== r && (h = u[r], u[r] = u[f], u[f] = h), l = s[r];
			for (i = 0; i < r; ++i) u[r] -= u[i] * l[i]
		}
		for (r = o - 1; r >= 0; --r) {
			l = s[r];
			for (i = r + 1; i < o; ++i) u[r] -= u[i] * l[i];
			u[r] /= l[r]
		}
		return u
	};
	
	numeric.solve = function(t, n, r) {
		return numeric.LUsolve(numeric.LU(t, r), n)
	};
