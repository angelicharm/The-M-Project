M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'switch-layout', '<div id="m-main" class="m-perspective"> <div class="m-page m-page-1"> <div data-childviews="content_page1"></div> <div class="footer"></div> </div> <div class="m-page m-page-2"> <div data-childviews="content_page2"></div> <div class="footer"></div> </div> </div>');

M.SwitchLayout = M.Layout.extend({

    _type: 'M.SwitchLayout',

    template: M.Themes.getTemplateByName('switch-layout'),

    currentPage: null,

    applyViews: function( settings ){

        var current = $('.m-page-current');

        var next = $('.m-page:not(.m-page-current)');

        var selector = '';

        if(this.currentPage === null || this.currentPage === 'content_page2'){
            this.currentPage = 'content_page1';

        } else if(this.currentPage === 'content_page1'){
            this.currentPage = 'content_page2';
        }

        if(!this.childViews[this.currentPage]){
            this.addChildView(this.currentPage, settings.content);
        } else if(this.childViews[this.currentPage] !== settings.content){
            this.addChildView(this.currentPage, settings.content);
        }

        if(!this._firstRender){
            //clear the dom before inserting the view
            this.$el.find('[data-childviews="' + this.currentPage + '"]').html('');
            //insert the view
            this.$el.find('[data-childviews="' + this.currentPage + '"]').html(settings.content.render().$el);
        }


        return this;
    },

    _render: function(){
        M.Layout.prototype._render.apply(this, arguments);
        if(this._firstRender){
            $('body').html(this.$el);
        }
    },

    _postRender: function(){
        if(this._firstRender){
            M.PageTransitions.init();
        }
        M.Layout.prototype._postRender.apply(this, arguments);
    },

    startTransition: function(){
        M.PageTransitions.startTransition();
    }
})
