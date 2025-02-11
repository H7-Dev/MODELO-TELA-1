/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'CRUD-BASICO\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-plus-small': '&#xe900;',
		'icon-minus': '&#xe901;',
		'icon-minus-small': '&#xe902;',
		'icon-not-found-alt': '&#xe921;',
		'icon-search': '&#xe922;',
		'icon-asterik': '&#xe91c;',
		'icon-asterik-2': '&#xe91d;',
		'icon-asterik-3': '&#xe91e;',
		'icon-medical-star': '&#xe91f;',
		'icon-medical-star-2': '&#xe920;',
		'icon-dot-circle': '&#xe91a;',
		'icon-rec': '&#xe91b;',
		'icon-facebook': '&#xe914;',
		'icon-facebook-messenger': '&#xe915;',
		'icon-github': '&#xe916;',
		'icon-google': '&#xe917;',
		'icon-microsoft': '&#xe918;',
		'icon-whatsapp': '&#xe919;',
		'icon-angle-down': '&#xe903;',
		'icon-angle-left': '&#xe904;',
		'icon-angle-right': '&#xe905;',
		'icon-angle-up': '&#xe906;',
		'icon-check': '&#xe907;',
		'icon-circle-user': '&#xe908;',
		'icon-circle-xmark': '&#xe909;',
		'icon-cross': '&#xe90a;',
		'icon-crossed-eye': '&#xe90b;',
		'icon-cross-small': '&#xe90c;',
		'icon-e-mail': '&#xe90d;',
		'icon-envelope': '&#xe90e;',
		'icon-eye': '&#xe90f;',
		'icon-fingerprint': '&#xe910;',
		'icon-interrogation': '&#xe911;',
		'icon-lock': '&#xe912;',
		'icon-pencil': '&#xe913;',
		'icon-plus': '&#xe923;',
		'icon-trash': '&#xe924;',
		'icon-user': '&#xe925;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
