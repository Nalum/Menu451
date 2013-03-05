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

(function ($) {
    $.fn.extend({
        'menu451'   : function (options) {
            var defaults = {
                    'idExtention'   : '-popup',
                    'activeClass'   : 'active',
                    'timeoutLength' : 350,
                    'timeoutItems'  : ['doc-popup', 0]
                },
                settings = $.extend({}, defaults, options);

            return this.each(function () {
                var $object = $(this),
                    $listItems = $('li', $object);

                $listItems.each(function () {
                    var $li = $(this);

                    if ($li.attr('id').length > 0) {
                        var $menuItem = $('#' + $li.attr('id') + settings.idExtention),
                            timeoutId = $.inArray($menuItem.attr('id'), settings.timeoutItems) + 1;

                        $li.hover(function () {
                            $li.addClass(settings.activeClass);
                            $menuItem.show();
                            clearTimeout(settings.timeoutItems[timeoutId]);
                        }, function () {
                            if (timeoutId > 0) {
                                settings.timeoutItems[timeoutId] = setTimeout(function () {
                                    $menuItem.hide();
                                    $li.removeClass(settings.activeClass);
                                }, settings.timeoutLength);
                            } else {
                                $menuItem.hide();
                                $li.removeClass(settings.activeClass);
                            }
                        });

                        $menuItem.each(function () {
                            var $item = $(this),
                                children = $item.find('.closePopup');

                            children.click(function () {
                                $item.hide();
                                $li.removeClass(settings.activeClass);
                            });
                        }).hover(function () {
                            var $this = $(this);

                            $li.addClass(settings.activeClass);
                            $this.show();
                            clearTimeout(settings.timeoutItems[timeoutId]);
                        }, function () {
                            var $this = $(this);

                            if ($.inArray($this.attr('id'), settings.timeoutItems) >= 0) {
                                settings.timeoutItems[timeoutId] = setTimeout(function () {
                                    $li.removeClass(settings.activeClass);
                                    $this.hide();
                                }, settings.timeoutLength);
                            } else {
                                $li.removeClass(settings.activeClass);
                                $this.hide();
                            }
                        });
                    } else {
                        $li.hover(function () {
                            $li.addClass(settings.activeClass);
                        }, function () {
                            $li.removeClass(settings.activeClass);
                        });
                    }

                    var $liLinks = $('a', $li);

                    $liLinks.click(function (event) {
                        var $this = $(this);

                        if ($this.attr('href') == '#' || $this.attr('href').length <= 0) {
                            event.preventDefault();
                        }
                    });
                });
            });
        }
    });
}(jQuery));