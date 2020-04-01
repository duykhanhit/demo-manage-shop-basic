function Post(){
    function bindEvent(){
        $(".post_edit").click(function(e){
            var params = {
                id: document.getElementsByName('id')[0].value,
                name: document.getElementsByName('title')[0].value,
                url: document.getElementsByName('url')[0].value,
                descriptions: document.getElementsByName('desc')[0].value,
                keyword: document.getElementsByName('keyword')[0].value,
                inCategory: document.getElementsByName('category')[0].value,
                total: document.getElementsByName('total')[0].value,
                price: document.getElementsByName('price')[0].value,
                promotion: document.getElementsByName('promotion')[0].value,
            };

            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            
            $.ajax({
                url: base_url + "/dashboard/product-management/edit/" + params.id,
                type: "PUT",
                data: {
                    data: params,
                    // product: product,
                    // listName: listCategory
                },
                dataType: "json",
                success: function(res){
                    if(res && res.status_code == 200){
                        location.reload();
                    }
                }
            });
        });

        $(".post_delete").click(function(e){
            var id = $(this).attr("id");

            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            
            $.ajax({
                url: base_url + "/dashboard/product-management/delete/",
                type: "DELETE",
                data: {id: id},
                dataType: "json",
                success: function(res){
                    if(res && res.status_code == 200){
                        location.reload();
                    }
                }
            });
        });
    }

    bindEvent();
}

$(document).ready(function(){
    new Post();
});