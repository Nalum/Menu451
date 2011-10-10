/**
 * Menu451
 * 
 * jQuery plugin to show/hide menu popups.
 * 
 * Min Required:
 *      jQuery Version 1.2
 * 
 * Example Usage:
 *      $('ul.nav').menu451();
 * 
 * Default Options:
 *      idExtention     : '-popup'
 *      activeClass     : 'active'
 *      timeoutLength   : 350
 *      timeoutItems    : ['doc-popup', 0]
 * 
 * @version 1.1.0
 * @author  Luke Mallon <luke.mallon@nexus451.com>
 * @copy    Nexus451
 */

(function($) {
    $.fn.extend({
        'menu451'   : function(options) {
            var defaults = {
                'idExtention'   : '-popup',
                'activeClass'   : 'active',
                'timeoutLength' : 350,
                'timeoutItems'  : ['doc-popup', 0]
            };
            
            var options = $.extend(defaults, options);
            
            return this.each(function() {
                var obj = $(this);
                var listItems = $('li', obj);
                
                listItems.each(function() {
                    var li = $(this);
                    
                    if (li.attr('id').length > 0) {
                        var menuItem = $('#' + li.attr('id') + options.idExtention);
                        var timeoutId = $.inArray(menuItem.attr('id'), options.timeoutItems) + 1;
                        
                        li.hover(function() {
                            li.addClass(options.activeClass);
                            menuItem.show();
                            clearTimeout(options.timeoutItems[timeoutId]);
                        }, function() {
                            if (timeoutId > 0) {
                                options.timeoutItems[timeoutId] = setTimeout(function() {
                                    menuItem.hide();
                                    li.removeClass(options.activeClass);
                                }, options.timeoutLength);
                            } else {
                                menuItem.hide();
                                li.removeClass(options.activeClass);
                            }
                        });
                        
                        menuItem.each(function() {
                            var $this = $(this);
                            var children = $this.find('.closePopup');
                            children.click(function() {
                                $this.hide();
                                li.removeClass(options.activeClass);
                            });
                        }).hover(function() {
                            var $this = $(this);
                            li.addClass(options.activeClass);
                            $this.show();
                            clearTimeout(options.timeoutItems[timeoutId]);
                        }, function() {
                            var $this = $(this);
                            
                            if ($.inArray($this.attr('id'), options.timeoutItems) >= 0) {
                                options.timeoutItems[timeoutId] = setTimeout(function() {
                                    li.removeClass(options.activeClass);
                                    $this.hide();
                                }, options.timeoutLength);
                            } else {
                                li.removeClass(options.activeClass);
                                $this.hide();
                            }
                        });
                    } else {
                        li.hover(function() {
                            li.addClass(options.activeClass);
                        }, function() {
                            li.removeClass(options.activeClass);
                        });
                    }
                    
                    var liLinks = $('a', li);
                    
                    liLinks.click(function() {
                        var $this = $(this);
                        if ($this.attr('href') == '#' || $this.attr('href').length <= 0) {
                            return false;
                        }
                    });
                });
            });
        }
    });
})(jQuery);