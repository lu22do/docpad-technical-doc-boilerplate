```
title: HTML Advanced Developer’s Guide
layout: guide
tags: ['guide']
pageOrder: 2
```

# HTML Advanced Developer’s Guide

## Overview

This document outlines various advanced programming techniques, which
allow efficient and fast development of HTML applications using XXXX
WebKit.

Also included are techniques allowing developers to achieve good
application performance even on limited embedded devices such as set-top
boxes.

To get started, first refer to the *XXXX Application Developer’s
Guide*, which covers basic concepts such as how to access custom APIs
for XXXX functionality (CCOM), as well as general differences between
XXXX WebKit and common desktop browsers.

## Maximizing UI Performance

### General Best Practices

XXXX WebKit is broadly compatible with normal browser standards and
programming techniques. However, running on a device with limited
resources means application developers must always keep in mind the more
constrained set-top box environment.

The following best practices help to maximize application performance:

* Browsers do differ, making it worthwhile to compare
techniques using simple test cases.
* Use modern layout techniques such as *flexbox*.
* Minimize the size of the DOM. Keep it simple, reducing
time spent searching it and the amount of garbage collection required.
* Changing state with an inline style has performance
benefits for single attributes. For multiple attributes, use classes
instead of inline styles.
* Use <span
style="font-size:10.0pt;line-height:150%;font-family:
&quot;Courier New&quot;">display:none</span> to hide rarely used
contexts, saving memory.  For commonly used contexts, <span
style="font-size:10.0pt;line-height:
150%;font-family:&quot;Courier New&quot;">visibility:hidden</span>
yields better performance regarding show/hide speed, but requires more
memory.
* Use premade images for certain effects. For example, use a
PNG image with a gradient as an alternative to a CSS gradient.
* Use hardware acceleration sparingly, as it has overhead
and memory costs. Try animations without acceleration first, and only
add acceleration to those that need it.

### Performance Snags

Experience has shown that an application developer may inadvertently
introduce inefficiencies into HTML applications, causing degraded
performance or visual artefacts. This section highlights common issues:

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>Activity within the application during an animation may
impact the smoothness of the animation.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>The sibling rule causes unexpected extra AC layers. Too
many layers might cause a performance slowdown.  Refer to *The Sibling
Rule* discussion for details.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>Decoded images may drop out of memory and be redecoded.
Refer to the ** *Memory Cache* section for details.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>Changing an element to or from an opacity of exactly 1.0
causes an extra repaint. This is a deliberate browser behavior.

### Key Handling Requires Care

Keys are handled with a higher priority than both layout and painting
within the browser and may interfere with animations.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">         </span></span>If
a key handler routine takes time processing keys, the repeat key can be
suppressed by removing the handler from the DOM and re-inserting it when
finished. This can help prevent key backlog accumulation.

### Using CCOM Incurs a High Overhead

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>CCOM calls often cross into other processes.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>The time required to execute a call may vary considerably.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>Caching results is often worthwhile, especially read-only
values available at boot up.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>Cache EPG service data in JavaScript variables instead of
repeatedly accessing the CCOM arrays.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>Avoid calling CCOM methods during animation or scrolling.

### Caution with CSS Changes

Changing styles effects the amount of work a browser must do in order to
render a page. Minimizing changes dramatically reduces this work.

Try to minimize triggering each of the layout, paint, and composite
stages of the browser page rendering. A CSS change causes one or more of
these. The more stages that are triggered, the more work the browser
must do. The site [csstriggers.com](http://csstriggers.com/) gives a
convenient overview of which style changes cause which stages to
trigger.

If a CSS change causes a layout alteration, an immediate read of a
computed style property forces the browser to refresh the layout to
ensure the property is up-to-date.  Style reads should be done before
making any CSS changes.

An extreme case of “forced synchronous layout” occurs when an
application repeatedly reads and writes styles in a tight loop. The
browser is forced to update the layout during each loop iteration,
wasting CPU time. This can be detected with the WebInspector, which
displays a large number of “Recalculate Style” lines in the Timeline
view.

## Debugging Tools and Techniques

### Developer Debug Options

To help debug the application, logging can be dynamically
enabled/disabled for important operations. This feature is included in
the default SDK and debug build, but excluded in the release build. This
setting can be overridden by adding <span
style="font-size:10.0pt;line-height:150%;
font-family:&quot;Courier New&quot;">enable-developer-debug=yes</span>
or <span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">enable-developer-debug=no</span>
to the command-line make command.

To use this feature, add the following section to *otvwebkit-config.xml*
in the target directory:

<span lang="X-NONE">    &lt;developer-debug support="specify"&gt;\
        &lt;gc&gt;false&lt;/gc&gt;\
        &lt;graphics-layer&gt;false&lt;/graphics-layer&gt;\
        &lt;image&gt;false&lt;/image&gt;\
        &lt;js-log-verbose&gt;false&lt;/js-log-verbose&gt;\
        &lt;memory-cache&gt;false&lt;/memory-cache&gt;\
        &lt;js-timer&gt;false&lt;/js-timer&gt;\
        &lt;key-event&gt;false&lt;/key-event&gt;\
        &lt;layout&gt;false&lt;/layout&gt;\
        &lt;paint&gt;false&lt;/paint&gt;\
        &lt;ccom&gt;false&lt;/ccom&gt;\
        &lt;resource&gt;false&lt;/resource&gt;\
       
&lt;graphics-layer-visual&gt;false&lt;/graphics-layer-visual&gt;\
        &lt;xhr&gt;false&lt;/xhr&gt;\
        &lt;force-gc&gt;&lt;/force-gc&gt;\
        &lt;js-heap&gt;&lt;/js-heap&gt;\
        &lt;dom-size&gt;&lt;/dom-size&gt;\
        &lt;dom-tree&gt;&lt;/dom-tree&gt;\
        &lt;fps&gt;&lt;/fps&gt;\
        &lt;prefix&gt;&lt;/prefix&gt;\
    &lt;/developer-debug&gt;</span>

<span lang="X-NONE"> </span>

All the items can be turned OFF globally by setting the parent key <span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;developer-debug
support&gt;</span> to "none" (the default value “specify”).  “Specify”
means each sub-item value is processed separately.

**Example A\
(disable all debug features)**

**Example B\
(enable JavaScript garbage collection,\
toggle layer borders with RED button,\
disable key events, toggle paint timing\
with F2)**

<span style="font-family:&quot;Courier New&quot;">&lt;developer-debug
support="**<span style="color:red">none</span>**"&gt;\
...\
&lt;/developer-debug&gt;</span>

<span style="font-family:&quot;Courier New&quot;">&lt;developer-debug
support="**<span style="color:green">specify</span>**"&gt;\
    &lt;gc&gt;true&lt;/gc&gt;\
   
&lt;graphics-layer-visual&gt;***RC\_RED***&lt;/graphics-layer-visual&gt;\
    &lt;key-event&gt;false&lt;/key-event&gt;\
    &lt;paint&gt;***F2***&lt;/paint&gt;\
&lt;/developer-debug&gt;</span>

 

For most of the developer-debug choices above, you can use one of three
values:

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">false</span><span
style="font-size:10.0pt;line-height:150%"> </span>or <span
style="font-size:
10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">empty</span><span
style="font-size:10.0pt;line-height:150%"> </span>\
The feature is OFF.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">true</span>\
The feature is ON all the time. Note that this greatly impacts
performance, particularly if the option generates a lot of logging data.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">gdk
key name</span>\
The feature can be toggled ON/OFF at runtime with the specified key (for
example, F2 key is used above to toggle &lt;<span
style="font-family:&quot;Courier New&quot;">paint</span>&gt;).

Exact values are given in the following table:

**<span style="font-size:10.0pt;
   line-height:150%">Developer Debug Tag</span>**

**<span style="font-size:10.0pt;
   line-height:150%">Possible Values</span>**

**<span style="font-size:10.0pt;
   line-height:150%">Explanation</span>**

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">ccom</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">CCOM (plugin) method/property execution with names
and timings</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">developer-debug</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">none |
specify</span>

<span style="font-size:10.0pt;
  line-height:150%">Contains the various developer-debug options</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">dom-size</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">gdk key
name</span>

<span style="font-size:10.0pt;
  line-height:150%">Show total DOM size</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">dom-tree</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">gdk key
name</span>

<span style="font-size:10.0pt;
  line-height:150%">Print out DOM tree</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">force-gc</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">gdk key
name</span>

<span style="font-size:10.0pt;
  line-height:150%">Force JavaScript garbage collection, same as calling
</span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">window.gc()</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">fps</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">gdk key
name</span>

<span style="font-size:10.0pt;
  line-height:150%">Starts, stops and prints frames-per-second</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">gc</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">JavaScript garbage collection logs</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">graphics-layer</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">AC layer info (</span><span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">name</span><span
style="font-size:10.0pt;line-height:150%">, </span><span
style="font-size:
  10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">position</span><span
style="font-size:10.0pt;line-height:150%">, </span><span
style="font-size:
  10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">size</span><span
style="font-size:10.0pt;line-height:150%">)</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">graphics-layer-visual</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">Colored layer borders and draw-count</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">image</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">Image decoding and rendering with timing</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">js-heap</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">gdk key
name</span>

<span style="font-size:10.0pt;
  line-height:150%">Show JavaScript heap used and total bytes.</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">js-log-verbose</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">File and line numbers in JS log (including alert,
console.log, confirm, prompt)</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">js-timer</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">Show JS timer/interval execution with timing, also
prints the JS code</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">key-event</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">Print key event details, including GDK key
names. This is a good way to learn the GDK key names for  toggling other
developer-debug features</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">layout</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">Layout profiling</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">memory-cache</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">Size of dead data, live data and their decoded data
of all kinds of sub-resources (js, html, image, etc.)</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">Paint</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">Paint timing</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">prefix</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">gdk key
name</span>

<span style="font-size:10.0pt;
  line-height:150%">This UTF-8 prefix will be added to the beginning of
each trace. If the prefix is </span><span
style="font-size:10.0pt;line-height:
  150%;font-family:&quot;Courier New&quot;">timestamp</span><span
style="font-size:10.0pt;
  line-height:150%">, a timestamp is added instead.</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">resource</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">Network/file requests with profiling</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">toggle-ac</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">gdk key
name</span>

<span style="font-size:10.0pt;
  line-height:150%">Dynamically toggle accelerated-compositing
on/off</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">xhr</span>

<span style="font-size:10.0pt;
  line-height:150%;font-family:&quot;Courier New&quot;">false | true |
gdk key name</span>

<span style="font-size:10.0pt;
  line-height:150%">XMLHttpRequest with timing (synchronous)</span>

 

**Example 1:**

**Developer Debug Settings**

**Console Output**

<span
style="font-family:&quot;Courier New&quot;">&lt;js-timer&gt;true&lt;/js-timer&gt;\
&lt;xhr&gt;true&lt;/xhr&gt;\
&lt;prefix&gt;timestamp&lt;/prefix&gt;</span>

<span style="font-family:&quot;Courier New&quot;">\[timestamp: 96423
ms\] DeveloperDebugJsTimer: anonymous js function (no-name)\
\[source-start\]\
{\$N.gui.ResolutionManager.initialiseContext(document);\$N.apps.core.Language.import\
LanguageBundleForObject(Search,Search.init,"apps/search/","LanguageBundle.js",null,window);}\
\[source-end\]\
\[timestamp: 9423 ms\] DeveloperDebugJsTimer:\[0\] timer begin
(no-name)\
\[timestamp: 9425 ms\] DeveloperDebugXHR:     \[1\] timer begin
XMLHttpRequest::send\
\[timestamp: 9541 ms\] DeveloperDebugXHR:     \[1\] timer end: duration:
116.0 ms for XMLHttpRequest::send\
\[timestamp: 9543 ms\] DeveloperDebugXHR:     \[1\] timer begin
XMLHttpRequest::send\
\[timestamp: 9553 ms\] DeveloperDebugXHR:     \[1\] timer end: duration:
10.2 ms for XMLHttpRequest::send\
\[timestamp: 9930 ms\] DeveloperDebugJsTimer:\[0\] timer end: duration:
507.4 ms for (no-name) </span>

 

Notice the number in brackets \[x\] in the output in Example 1, which
indicates the level of nesting within a timed section of code. 

The XHR requests (with nesting level \[1\]) are taking place during the
JavaScript execution (nesting level \[0\]).  The duration of the JsTimer
event includes the durations of the XHR events.\
\
**Example 2:**

**Developer Debug Settings**

**Console Output**

<span
style="font-family:&quot;Courier New&quot;">&lt;key-event&gt;true&lt;/key-event&gt;</span>

<span style="font-family:&quot;Courier New&quot;">&lt;prefix&gt;   ?  
&lt;/prefix&gt;</span>

   <span style="font-family:&quot;Courier New&quot;">?   01:10:54:384
GDKKeyEvent, Type:GDK\_KEY\_PRESS, Keycode:59, Keyvalue:65470, gdk key
name:F1\
   ?   01:10:54:384 WebKitPlatformKeyEvent, Type:KeyDown,
NativeCode:65470, VirtualCode:112, Text:\
   ?   01:10:54:480 GDKKeyEvent, Type:GDK\_KEY\_RELEASE, Keycode:59,
Keyvalue:65470, gdk key name:F1\
   ?   01:10:54:480 WebKitPlatformKeyEvent, Type:KeyUp,
NativeCode:65470, VirtualCode:112, Text:\
\
   ?   01:13:03:576 GDKKeyEvent, Type:GDK\_KEY\_PRESS, Keycode:28,
Keyvalue:65293, gdk key name:Return\
   ?   01:13:03:577 WebKitPlatformKeyEvent, Type:KeyDown,
NativeCode:65293, VirtualCode:13, Text:\
   ?   01:13:03:704 GDKKeyEvent, Type:GDK\_KEY\_RELEASE, Keycode:28,
Keyvalue:65293, gdk key name:Return\
   ?   01:13:03:704 WebKitPlatformKeyEvent, Type:KeyUp,
NativeCode:65293, VirtualCode:13, Text:\
\
   ?   01:13:17:216 GDKKeyEvent, Type:GDK\_KEY\_PRESS, Keycode:65535,
Keyvalue:61506, gdk key name:RC\_RED\
   ?   01:13:17:217 WebKitPlatformKeyEvent, Type:KeyDown,
NativeCode:61506, VirtualCode:61506, Text:\
   ?   01:13:17:578 GDKKeyEvent, Type:GDK\_KEY\_RELEASE, Keycode:65535,
Keyvalue:61506, gdk key name:RC\_RED\
   ?   01:13:17:579 WebKitPlatformKeyEvent, Type:KeyUp,
NativeCode:61506, VirtualCode:61506, Text:\
\
   ?   01:13:24:154 GDKKeyEvent, Type:GDK\_KEY\_PRESS, Keycode:65535,
Keyvalue:61451, gdk key name:RC\_OK\
   ?   01:13:24:154 WebKitPlatformKeyEvent, Type:KeyDown,
NativeCode:61451, VirtualCode:61451, Text:\
   ?   01:13:24:354 GDKKeyEvent, Type:GDK\_KEY\_RELEASE, Keycode:65535,
Keyvalue:61451, gdk key name:RC\_OK\
   ?   01:13:24:355 WebKitPlatformKeyEvent, Type:KeyUp,
NativeCode:61451, VirtualCode:61451, Text:\
\
   ?   01:13:35:561 GDKKeyEvent, Type:GDK\_KEY\_PRESS, Keycode:65535,
Keyvalue:61467, gdk key name:RC\_EPG\
   ?   01:13:35:562 WebKitPlatformKeyEvent, Type:KeyDown,
NativeCode:61467, VirtualCode:61467, Text:\
   ?   01:13:37:653 GDKKeyEvent, Type:GDK\_KEY\_RELEASE, Keycode:65535,
Keyvalue:61467, gdk key name:RC\_EPG\
   ?   01:13:37:653 WebKitPlatformKeyEvent, Type:KeyUp,
NativeCode:61467, VirtualCode:61467, Text:\
\
   ?   01:13:51:008 GDKKeyEvent, Type:GDK\_KEY\_PRESS, Keycode:57,
Keyvalue:32, gdk key name:space\
   ?   01:13:51:713 WebKitPlatformKeyEvent, Type:KeyDown, NativeCode:32,
VirtualCode:32, Text:\
   ?   01:13:51:739 GDKKeyEvent, Type:GDK\_KEY\_RELEASE, Keycode:57,
Keyvalue:32, gdk key name:space\
   ?   01:13:51:739 WebKitPlatformKeyEvent, Type:KeyUp, NativeCode:32,
VirtualCode:32, Text:</span>

 

Results are seen by a UTF-8-capable terminal after pressing F1-key,
Enter-key (Return), Red-button, Ok-button, Guide-button (EPG), and
Space-key.  Note that the timestamp is no longer included.  The prefix
simply becomes the selected UTF-8 character string (whitespace
included).

### How to use XXXX WebKit Web Inspector

XXXX.1.3 and XXXX.1.4 use different Web Inspector backends.

In XXXX.1.3, the Web Inspector is similar to Chrome, with a few
limitations.  In XXXX.1.4, the Web Inspector is similar to Safari
(refer to \[XXXX.1.4\] How to use XXXX WebKit Web Inspector for
details).

The XXXX.1.3 WebKit may be built to enable the WebKit Remote
Inspector. Once XXXX WebKit is running on a target (at IP x.x.x.x),
point your desktop browser to x.x.x.x:2999 and wait for it to load.

Element attributes may be edited within the inspector view and the
browser updates to the new values.

As the mouse hovers over elements in the inspector view, they are
highlighted on the target display. Some additional attributes are also
displayed.

Note that the inspector-enabled build of XXXX.1.3 WebKit requires
more memory for both the static image size (+10%) and <span
style="font-size:10.5pt;line-height:150%;color:#333333;background:white">run-time
memory (+10-20%)</span>.  The increase in run-time memory mostly occurs
when the inspector is open and active.

Major differences between XXXX.1.3 Webkit and Chrome include:

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>**Resource**\
Does not support WebSQL and IndexedDB.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>**Network**\
Does not support the overview window.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>**Profiles**

<span style="font-family:
&quot;Courier New&quot;">o<span
style="font:7.0pt &quot;Times New Roman&quot;">   </span></span>Supports
“Collect CSS Selector Profile”

<span style="font-family:
&quot;Courier New&quot;">o<span
style="font:7.0pt &quot;Times New Roman&quot;">   </span></span>Don’t
support “Take Heap Snapshot” and “Record Heap Allocation”

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>**Settings**\
Supports limited setting options

### How to use XXXX WebKit Web Inspector

XXXX.1.3 and XXXX.1.4 use different Web Inspector backends. In
XXXX.1.3, the Web Inspector is similar to Chrome, with a few
limitations (refer to \[XXXX.1.3\] How to use XXXX WebKit Web
Inspector for details).

In XXXX.1.4, the Web Inspector is similar to Safari, with a few
minor limitations. For details about Safari’s implementation, refer to
the [Safari Web Inspector User
Guide](https://developer.apple.com/library/mac/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html). 

<span style="font-size:11.0pt">Major differences between </span>XXXX
5.1.4’s WebKit <span style="font-size:11.0pt">and Safari include:
</span>

<span style="font-size:11.0pt;font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span style="font-size:11.0pt">XXXX’s WebKit adds a
“Profiles” button on the tool bar, which launches the profile side bar
and view.</span>

<span style="font-size:11.0pt;font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span style="font-size:11.0pt"> Timelines</span>

<span
style="font-size:11.0pt;font-family:&quot;Courier New&quot;">o<span
style="font:7.0pt &quot;Times New Roman&quot;">   </span></span><span
style="font-size:11.0pt">Using Safari, the Timeline panel and Profiles
side bar panel are accessed using the same view, but XXXX WebKit
separates them into two views.  The Profiles side bar is launched by
using the “Profiles” button on the toolbar.</span>

<span
style="font-size:11.0pt;font-family:&quot;Courier New&quot;">o<span
style="font:7.0pt &quot;Times New Roman&quot;">   </span></span><span
style="font-size:11.0pt">XXXX WebKit does not support the CSS Selector
Profiling feature </span>

<span style="font-size:11.0pt;font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span style="font-size:11.0pt">The Safari Keyboard
Shortcuts don’t apply to XXXX WebKit. Refer to the </span>XXXX
WebKit Keyboard Shortcuts <span style="font-size:11.0pt">section for
details.</span>

#### Launching the XXXX WebKit Web Inspector

Once the XXXX.1.4 WebKit is running on a target (at IP x.x.x.x),
point your desktop browser to x.x.x.x:2999 and wait for it to load.

Element attributes may be edited within the inspector view and the
browser updates to match the new values.

As the mouse hovers over elements in the inspector view, they are
highlighted on the target display. Some additional attributes are also
displayed.

Note that the inspector enabled build of XXXX WebKit requires more
memory for both the static image size (+10%) and run-time memory
(10-20%).  The increase in run-time memory mostly occurs when the
inspector is open and active.

#### Using WebKit Inspector to Debug Performance

The WebKit Inspector includes a few features useful for debugging
performance and identifying bottlenecks.  These include:

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>The timeline view.\
This gives a graphical display of time spent performing different
operations. Of particular interest are timings for JavaScript execution,
rendering and painting.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>The style browser.\
This shows the actual styles applied to an element, including calculated
styles. A large number of styles applied to an element can mean a
performance bottleneck.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span>Styles can be enabled and disabled on the fly to aid in
analyzing their effects.

#### Determining Bottlenecks using developer-debug

Most developer debug messages help identify bottlenecks, but the
following messages are of particular interest:

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;gc&gt;</span>
logs when Garbage Collection happens and the time required. If GC is too
infrequent when it is finally performed it may take too long, freezing
the whole UI for the user.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;graphics-layer&gt;</span>
shows the graphics layers and whether they have backing store. Too many
graphics layers can indicate a bottleneck.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;image&gt;</span>
shows image decoding and rendering with timing. This can show whether
assets are being cached well or unnecessarily re-decoded.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;layout&gt;</span>
can show when a page needs layout too frequently. This can be caused by
excessive changes in style settings.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;paint&gt;</span>
shows how much time the browser is spending on paint operations.

<span style="font-family:Symbol">·<span
style="font:7.0pt &quot;Times New Roman&quot;">        
</span></span><span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;ccom&gt;</span>
shows time spent in CCOM calls. These calls can often take a long time
as they cross process boundaries and can interfere with rendering. They
should be avoided when animations are taking place.

#### Using &lt;timestamp&gt; feature

The <span style="font-size:10.0pt;line-height:150%;
font-family:&quot;Courier New&quot;">&lt;timestamp&gt;</span> feature of
developer debug adds a timestamp to developer debug traces, allowing
timings to be calculated.

#### Measuring animation FPS

The frame rate actually achieved can be measured using developer-debug
or JavaScript.

Within developer-debug, enable the <span style="font-size:
10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;fps&gt;</span>
option by using a keystroke. Strike the key at the beginning and again
at the end of an animation. The frames-per-second achieved over that
period are logged to the console.

XXXX Webkit also provides a (non-standard) addition to the Javascript
performance interface, *webkitFrameCount*.

The *performance.webkitFrameCount* value returns the number of frames
rendered by the browser at that point.

For example, to calculate the FPS for a transition:

<span lang="X-NONE">// Get the time and frame count at the beginning of
a transition.</span>

<span lang="X-NONE">        startFrame =
performance.webkitFrameCount;</span>

<span lang="X-NONE">        startTime = performance.now();</span>

<span lang="X-NONE">…</span>

<span lang="X-NONE">// In a “transitionend” callback.</span>

<span lang="X-NONE">        endFrame =
performance.webkitFrameCount;</span>

<span lang="X-NONE">        endTime = performance.now();</span>

<span lang="X-NONE">        fps = (performance.webkitFrameCount -
startFrame)\*1000/(performance.now() - startTime);</span>

<span lang="X-NONE">        console.log("Calculated FPS is: " +
fps);</span>

 

It’s possible to achieve the value set in the xml <span
style="font-size:10.0pt;line-height:150%;font-family:&quot;Courier New&quot;">&lt;animation-fps-max&gt;</span>,
but low FPS may be an indicator of bottlenecks in the application.

#### Using “top” command

The standard UNIX ‘<span style="font-size:10.0pt;line-height:
150%;font-family:&quot;Courier New&quot;">top</span>’ command is
available. This lists processes consuming the most memory and CPU power.
It may show when another process is starving the XXXX WebKit process.

## Video

The <span style="font-size:10.0pt;line-height:150%;
font-family:&quot;Courier New&quot;">&lt;video&gt;</span> tag is
primarily used with the CCOM Player object, which provides the full
XXXX feature set. Using the <span class="Code0"><span lang="X-NONE"
style="font-size:10.0pt;line-height:150%">&lt;video&gt;</span></span>
tag in the standard W3C manner (without CCOM) is primarily for streaming
internet video. The CCOM Player object allows many more advanced
features, such as altering the aspect ratio of video while scaling.

### 4.1.<span style="font:7.0pt &quot;Times New Roman&quot;">     </span> []()[Sizing Guidelines]()
