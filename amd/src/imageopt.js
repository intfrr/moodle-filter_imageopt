/**
 * This file is part of Moodle - http://moodle.org/
 *
 * Moodle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Moodle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @package   filter_imgopt
 * @copyright Copyright (c) 2017 Guy Thomas
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


/**
 * Main initialising function.
 */
define(['filter_imageopt/appear'],
    function($) {
        return {
            init:function() {
                $(document).ready(function() {
                    $(document.body).on('appear', 'img[data-loadonvisible]', function(e, appeared) {
                        appeared.each(function() {
                            var imgurl = $(this).data('loadonvisible');
                            $(this).attr('src', imgurl);
                            $(this).removeAttr('data-loadonvisible');
                        });
                    });
                    // Appear configuration - start loading images when they are out of the view port by 400px.
                    var appearConf = {appeartopoffset : 400, appearleftoffset : 400};
                    $('img[data-loadonvisible]').appear(appearConf);
                    $.force_appear();

                    /**
                     * listen for hash changes / popstates.
                     */
                    (function() {
                        var lastHash = location.hash;
                        $(window).on('popstate hashchange', function() {
                            var newHash = location.hash;
                            if (newHash !== lastHash) {
                                window.setTimeout(
                                    function() {
                                        $.force_appear();
                                    },
                                    200
                                );
                            }
                            lastHash = newHash;
                        });
                    })();

                });
            }
        };
    }
);