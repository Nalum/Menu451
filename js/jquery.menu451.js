/**
 * This script is released under the GNU GPL. See the file COPYING.
 * The script is provided as is, with no guarantee either express or implied
 * that it is fit for purpose. Use of the script, is entirely at the end users risk.
 *
 * @category Plugin
 * @package  Menu451
 * @author   Luke Mallon <luke.mallon@nexus451.com>
 * @license  GNU GPL - http://www.gnu.org/licenses/gpl.txt
 * @link     https://github.com/nalum/Menu451
 * @version  1.1.0
 */

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
