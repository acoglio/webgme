/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved
 *
 * Author: Brian Broll
 * 
 * Adding decorator support for showing connection areas
 */

define([], function (){
    
    //Stuff for displaying connection area
    var CONN_AREA_EDIT_CLASS = "conn-area-edit",
        CONN_AREA_SIZE = 8,
        CONN_AREA = "conn-area-edit-bg",
        DATA_CONN_AREA_ID = "CONN_AREA_ID";

    var SnapEditorWidgetDecoratorBaseConnectionAreas = function(){
    };

    //Displaying Connection Area
    SnapEditorWidgetDecoratorBaseConnectionAreas.prototype.displayConnectionArea = function (line) {
        var w = this.$el.outerWidth(true),
            h = this.$el.outerHeight(true),
            shiftVal = CONN_AREA_SIZE/2;

        this.hideConnectionAreas();

        if(line){
            if(this._connArea === undefined){
                this._connArea = $('<div/>', { 'class': CONN_AREA });
                this._connArea.css({ 'position': 'absolute', 
                                     'left': -shiftVal + 'px',
                                     'top': -shiftVal + 'px'});
            }

            this._svg = Raphael(this._connArea[0], w + CONN_AREA_SIZE, h + CONN_AREA_SIZE);
            this._svg.canvas.className.baseVal = CONN_AREA;

            //Create the connection area
            line.x1 += shiftVal;
            line.y1 += shiftVal;
            line.x2 += shiftVal;
            line.y2 += shiftVal;

            //if the area is too small, enlarge it
            if (Math.abs(line.x2 - line.x1) < CONN_AREA_SIZE &&
                    Math.abs(line.y2 - line.y1) < CONN_AREA_SIZE) {

                        if (line.x2 > line.x1) {
                            line.x1 -= CONN_AREA_SIZE / 2;
                            line.x2 += CONN_AREA_SIZE / 2;
                        } else {
                            line.x2 -= CONN_AREA_SIZE / 2;
                            line.x1 += CONN_AREA_SIZE / 2;
                        }
                    }

            var path = this._svg.path('M ' + line.x1 + ',' + line.y1 + 'L' + line.x2 + ',' + line.y2);
            $(path.node).data(DATA_CONN_AREA_ID, line.id);
            path.attr({ "stroke-width": CONN_AREA_SIZE });
            $(path.node).attr({ "class": CONN_AREA_EDIT_CLASS });        

            this.$el.append(this._connArea);
        }
    };

    SnapEditorWidgetDecoratorBaseConnectionAreas.prototype.hideConnectionAreas = function () {
        if(this._connArea){
            this._connArea.empty();
        }
    };

    return SnapEditorWidgetDecoratorBaseConnectionAreas;
});
