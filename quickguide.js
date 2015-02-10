Most frequently, we use jQuery() or $() constructor function to create a jQuery object.
jQuery selects a set of DOM elements using CSS and XPath selectors or several methods of jQuery object, both approaches can be combined.
jQuery object contains a collection of matched DOM elements either found in DOM or created by HTML string.
jQuery object behaves much like an array though not actually a Javascript Array object, it has a length property and the elements in the object can be accessed by their numeric indices [0] to [length-1].
jQuery destructive methods like .filter() or .find() could potentially change a set of DOM elements in the jQuery object, such a methods actually return a new jQuery object with resulting DOM elements. To return to the previous jQuery object use .end() method.
To create an empty jQuery object with no elements use the $() without argument. A jQuery object may also be empty if a selector does not select any elements, or if a chained method filters out all the elements.
 
$(selector).action(callback);

Here "$" is synonym or alias for "jQuery", and a legitimate character for variable and function names in Javascript.
$() is factory method for the jQuery object.
(selector) queries or finds DOM elements.
action() denotes the method to be called upon DOM elements.
(callback) denotes the callback function.

$(document).ready(function(){  // specify a function to execute when the DOM is fully loaded
  $(selector).method(function(){
    $(selector).method(function(){
      $(selector).method();
      $(selector).method1().method2().method3();  // methods that return jQuery object can be chained together
      $(this).method();
      //some more JQ/JS code;
    });
  });
});

Can use $(callback) as shorthand for $(document).ready(callback)

//jQuery Escape Character \\ for Special Characters #;&,.+*~':"!^$[]()=>|/
--------------------------------------------------------------------------
 $("#some:id")  // Does not work
 $("#some\\:id")  // Works!
 
jQuery has two styles of interaction:
-------------------------------------
1) via $ function, which return jQuery object and are chainable.
2) via $. prefixed functions, which are utility functions that do not work on the jQuery object per se. 

'this' is a special term in Javascript (not jQuery) meaning the current DOM element.
$(this) means "call jQuery function with Javascript's this". Turning DOM element into JQuery object allows use of JQuery functions on it.
$this is simply a variable, as $ is a valid character. It's unrelated to Javascript's this i.e. we can do something like var $this = $(this).
In jQ when inside of a callback function, 'this' is a relevant DOM element that initiated/triggered the event and has event handler attached.
To make things easy, jQuery sets the scope of the callback function to the element which is the subject of the callback.
'this' is a jQuery object when you are inside your own jQuery functions.
In many object-oriented programming languages, this (or self) is a keyword which can be used in instance methods to refer to the object on which the currently executing method has been invoked.


Callback and Functions:
-----------------------
Passing a callback with no arguments:
$.get('mypage.html', myCallBack);
Note that the second parameter here is simply the function name (without parentheses and not as a string). Functions in Javascript are 'First class citizens' and so can be passed around like variable references and executed at a later time. 

Passing a callback with arguments: 
$.get('mypage.html', function(){
  myCallBack(param1, param2);
});
Above an anonymous function is registered as the callback function that calls myCallBack, with the values of param1 and param2 in the outer scope. The param1 and param2 are evaluated as a callback when '$.get' is done getting the page.


jQuery Namespace Conflicts - Using jQuery with other JS Libraries:
------------------------------------------------------------------
// Import jQuery
// Import other JS library
If you include jQuery before other libraries, you may use "jQuery" when you do some work with jQuery, and the "$" is also the shortcut for the other library. Then there is no need for overriding the $-function by calling "jQuery.noConflict()".

Overriding the $-function:
--------------------------
// Import other JS library
// Import jQuery
jQuery.noConflict();
jQuery(document).ready(function(){	// Use jQuery instead of $(...)
  jQuery("button").click(callback);
});
// Code that uses other JS library's $

OR to have the benefit of the short name you define:

var $jQ = jQuery.noConflict();
$jQ(document).ready(function(){	// Use $jQ instead of jQuery(...) or $(...)
  $jQ("button").click(callback);
});

OR to still have the benefit of the $ short name:

jQuery.noConflict();
jQuery(document).ready(function($) {
  $("button").click(callback);  // Code that uses jQuery's $
});

OR using the $ inside a self-executing anonymous function:

jQuery.noConflict();
(function($) {
   $("button").click(callback);  // Code that uses jQuery's $
})(jQuery);


jQuery Event Model:
-------------------
jQuery event system normalizes the event object according to W3C standards. The event object is guaranteed to be passed to the event handler (no checks for window.event required). In event-handler the callback is called with one argument "Event" and the context is set to the handling element.

   $(document).ready(function() {
     $('div').bind('click', function(event){  //event is JavaScript event object
         alert('Event type is ' + event.type);
         alert('pageX : ' + event.pageX);
         alert('pageY : ' + event.pageY);
         alert('Target : ' + event.target.innerHTML); //"event.target" is the DOM element receiving event, and it can be a child
      });
   });


jQuery AJAX Functions:
-----------------------
$(selector).load(url,data,callback)	//High Level
$('#test').load('test1.txt');

$.ajax(options)				//Low Level

$(document).ready(function(){
  $("#b01").click(function(){
    htmlobj = $.ajax({url:"test1.txt",async:false});
    $("#test").html(htmlobj.responseText);
  });
});

Note that AJAX functions only return or pass an XHR object when an XHR object is actually used in the request.


jQuery Plug-in Development:
----------------------------
File Naming: jquery.myplugin.js

Adding a new custom function property to the jQuery.fn object:
jQuery.fn.myPlugin = function() {   //extending the jQuery object, jQuery.fn is an alias for jQuery.prototype
   // Do your awesome plugin stuff here
};

Recommended Method:
-----------------------
(function($){	// creates "private" scope that allows us to extend jQuery using the $ sign and ensure that your plugin doesn't collide with other libraries' $ sign.
  $.fn.myPlugin = function(options) {	// options denotes the function parameters.
    var settings = {'name1':'value1', 'name2':'value2'}	//default options value that can be changed during function call.
    // In the immediate scope of the plugin function, the "this" keyword refers to the jQuery object the plugin was invoked on
    // there's no need to do $(this) because "this" is already a jQuery object. Doing $(this) would be same as $($('#element')).
    // Return "this" in the immediate scope of plugin function to maintain chainability and pass the jQuery collection of elements to the next method in the chain.
    return this.each(function(){
  		if (options) { $.extend( settings, options ); }		// If options exist merge them with default settings.
	   	// In other instances where jQuery accepts a callback, "this" keyword refers to the native DOM element, whereas $(this) refers to jQuery object.
    });
  };
})(jQuery);	//self executing anonymous function (closure)

$('#element').myPlugin(); // call the plugin without options i.e. using the defaults, or
$('#element').myPlugin(options).somejQueryMethod(); // call the plugin with options and method chaining.
$('#element').myPlugin({'name1':'value3', 'name3':'value1'}); // final settings object ends up looking like {'name1':'value3', 'name2':'value2', 'name3':'value1'}

var somejQueryObject = $('#something');
somejQueryObject.myPlugin(options); // alerts 'true'
