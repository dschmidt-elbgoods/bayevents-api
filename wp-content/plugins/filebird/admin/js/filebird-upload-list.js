jQuery(document).ready(function(){var e=filebird_translate.move_1_file;jQuery("body").append('<div id="njt-filebird-attachment" data-id="">'+e+"</div>");var t=jQuery("#njt-filebird-attachment");jQuery.each(filebird_taxonomies.folder.term_list,function(e,t){jQuery(".wpmediacategory-filter").append('<option value="'+t.term_id+'">'+t.term_name+"</option>")}),jQuery(".wpmediacategory-filter").val(njt_filebird_dh.current_folder),jQuery.each(jQuery("table.wp-list-table tr"),function(n,i){jQuery(i).draggable({cursorAt:{top:0,left:0},helper:function(e){return jQuery("<span></span>")},start:function(n,i){var a=jQuery('.wp-list-table input[name="media[]"]:checked');a.length>0&&(e=filebird_translate.Move+" "+a.length+" "+filebird_translate.files),t.html(e),t.show(),jQuery("body").addClass("njt-draging")},stop:function(e,n){t.hide(),jQuery("body").removeClass("njt-draging")},drag:function(e,n){var i=jQuery(this).attr("id");i=i.match(/post-([\d]+)/),t.data("id",i[1]),t.css({top:e.clientY-15,left:e.clientX-15})}})}),jQuery("#wpcontent .jstree-anchor").droppable({drop:function(e,n){var i=jQuery(this).parent().attr("data-id"),a=function(){var e=jQuery('.wp-list-table input[name="media[]"]:checked'),t=[];if(e.length)return e.each(function(e,n){t.push(jQuery(n).val())}),t;return!1}();a.length?function(e,t,n){jQuery(n.target).addClass("need-refresh");var i={};i.ids=e,i.folder_id=t,i.action="filebird_save_multi_attachments",i.nonce=window.njt_fb_nonce,ntWMC.filebird_begin_loading(),jQuery.each(i.ids,function(e,t){jQuery("#post-"+t).addClass("njt-opacity")}),jQuery.ajax({type:"POST",dataType:"json",data:i,url:ajaxurl,success:function(e){if(e.success&&(e.data.forEach(function(e){ntWMC.updateCount(e.from,e.to)}),jQuery(".jstree-anchor").addClass("need-refresh"),null!=jQuery(".wpmediacategory-filter").val())){jQuery.each(i.ids,function(e,t){jQuery("#post-"+t).remove()});var t=jQuery(".wp-list-table tbody tr").length;0==t?(jQuery(".wp-list-table tbody").append(njt_filebird_dh.no_item_html),jQuery(".displaying-num").hide()):jQuery(".displaying-num").text(t+" "+(1==t?njt_filebird_dh.item:njt_filebird_dh.items))}jQuery(".wp-list-table tbody tr").removeClass("njt-opacity"),ntWMC.filebird_finish_loading()}})}(a,i,e):function(e,n){var i=t.data("id"),a=jQuery('.attachment[data-id="'+i+'"]'),r=jQuery(".wpmediacategory-filter").val();if("all"===n||n==r)return void jQuery(".wp-list-table tbody tr").removeClass("njt-opacity");ntWMC.filebird_begin_loading(),jQuery("#post-"+i).addClass("njt-opacity"),jQuery.ajax({type:"POST",dataType:"json",data:{id:i,action:"nt_wcm_get_terms_by_attachment",nonce:window.njt_fb_nonce},url:ajaxurl,success:function(t){var d=Array.from(t.data,e=>e.term_id);if(d.includes(Number(n)))return ntWMC.filebird_finish_loading(),void jQuery(".wp-list-table tbody tr").removeClass("njt-opacity");jQuery(e.target).addClass("need-refresh");var l={};l.id=i,l.attachments={},l.attachments[i]={menu_order:0},l.folder_id=n,l.action="filebird_save_attachment",l.nonce=window.njt_fb_nonce,jQuery.ajax({type:"POST",dataType:"json",data:l,url:ajaxurl,success:function(e){if(e.success&&(jQuery.each(d,function(e,t){ntWMC.updateCount(t,n)}),console.log(r,d.length),"all"!==r||d.length||ntWMC.updateCount(-1,n),-1==r&&ntWMC.updateCount(-1,n),"all"!=r&&a.detach()),ntWMC.filebird_finish_loading(),jQuery(".wp-list-table tbody tr").removeClass("njt-opacity"),null!=jQuery(".wpmediacategory-filter").val()){jQuery("#post-"+l.id).remove();var t=jQuery(".wp-list-table tbody tr").length;0==t?(jQuery(".wp-list-table tbody").append(njt_filebird_dh.no_item_html),jQuery(".displaying-num").hide()):jQuery(".displaying-num").text(t+" "+(1==t?njt_filebird_dh.item:njt_filebird_dh.items))}}})}})}(e,i)}}),setTimeout(function(){var e=localStorage.getItem("current_folder")||"all";jQuery("#menu-item-"+e+" .jstree-anchor").trigger("click")},1e3),jQuery(".menu-item-bar").bind({mouseenter:function(){var e=jQuery(this),t=e.find(".item-title").innerWidth(),n=e.find(".menu-item-title").innerWidth(),i=e.find(".menu-item-title").text();t<n+10&&tippy(e[0],{content:i,sticky:!0,offset:"0, 35",arrow:!0,zIndex:99999999,maxWidth:220})}})});