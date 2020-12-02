let isSell = 0;
let money = 0;
let passiveEarn = 0;
let isGame = 0;
scaleFactor = 1.1;
let awardsCreaturesInfo = {
    axe:{
        cost: 1000,
        isExist: 0
    },
    shovel:{
        cost: 5000,
        isExist: 0
    },
    wheat:{
        cost: 10000,
        isExist: 0
    },
    meat:{
        cost: 50000,
        isExist: 0
    },
    sword:{
        cost: 50000,
        isExist: 0
    },
    armour:{
        cost: 150000,
        isExist: 0
    },
    barrel:{
        cost: 60000,
        isExist: 0
    },
    horse:{
        cost: 300000,
        isExist: 0
    },
    hat:{
        cost: 1000000,
        isExist: 0
    },
    stick:{
        cost: 5000000,
        isExist: 0
    },
    potion:{
        cost: 20000000,
        isExist: 0
    },
    heal:{
        cost: 50000000,
        isExist: 0
    },
    prince:{
        cost: 500000000,
        isExist: 0
    },
    princess:{
        cost: 500000000,
        isExist: 0
    }
};
let shopCreaturesInfo = {
    peasant:{
        count:0,
        cost: 100,
        profit: 1
    },
    hut:{
        count:0,
        cost: 1000,
        profit: 10
    },
    warrior:{
        count:0,
        cost: 5000,
        profit: 50
    },
    fortress:{
        count:0,
        cost: 30000,
        profit: 300
    },
    wizard: {
        count:0,
        cost: 100000,
        profit: 1000
    },
    tower: {
        count:0,
        cost: 10000000,
        profit: 10000
    },
    castle: {
        count:0,
        cost: 100000000,
        profit: 100000
    }
};
function firework(){
    let count = 200;
    let defaults = {
        origin: { y: 0.7 }
    };
    function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
    }));
    }
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
function checkBorder(){     
    for(element in shopCreaturesInfo){
        if(shopCreaturesInfo[element].cost <= money)
            document.getElementById(element).style.border = "2px solid #ffd700";
        else   
            document.getElementById(element).style.border = "2px solid gray";  
    }
    for(element in awardsCreaturesInfo) {
        if(awardsCreaturesInfo[element].isExist){
            document.getElementById(element).style.border = "2px solid green";
        }
        else {
            if(awardsCreaturesInfo[element].cost <= money)
                document.getElementById(element).style.border = "2px solid #ffd700";
            else   
                document.getElementById(element).style.border = "2px solid gray"; 
        }
    }
}
function createTable(name,top=0){
    let table_div = document.createElement('div');
    table_div.setAttribute('id', name + "_" + "table");
    table_div.style.position = "absolute";
    table_div.style.top =  80*top + 10*(top+1) + "px";
    table_div.style.marginLeft = "50px";
    table_div.style.marginRight = "392px";
    table_div.style.height = "80px";
    table_div.style.border = "2px solid #389c51";
    table_div.style.overflowY = "scroll";
    return table_div;
}
function putSavedItem(name, top){
    let n = eval('shopCreaturesInfo.' + name + ".count");
    if(n>0)    document.getElementById("mapDiv").append(createTable(name,top));   
    for(let i=1; i<=n; i++){
        let item = document.createElement('img');
        item.src = document.getElementById(name).src;
        item.setAttribute('id',name + '_' + i)
        item.style.position="relative";
        item.style.width = "40px";
        document.getElementById(name + "_table").append(item);
    }
}
function putItem(name){
    shopCreaturesInfo[name].count = shopCreaturesInfo[name].count + 1;
    shopCreaturesInfo[name].cost = (shopCreaturesInfo[name].cost * scaleFactor).toFixed(0);
    document.getElementById(name +"_price").dispatchEvent(new Event("click"));
    document.getElementById(name +"_count").dispatchEvent(new Event("click"));
    passiveEarn = countPassiveEarn();
    document.getElementById("earn").dispatchEvent(new Event("click"));
    let item = document.createElement('img');
    item.src = document.getElementById(name).src;
    let count = eval('shopCreaturesInfo.' + name + ".count");
    item.setAttribute('id',name + '_' + count)
    item.style.position="relative";
    item.style.width = "40px";
    document.getElementById(name + "_table").append(item);  
    checkBorder();  
}
function countPassiveEarn(){
    earn = 0;
    for(element in shopCreaturesInfo){
        earn = earn + shopCreaturesInfo[element].count*shopCreaturesInfo[element].profit;
    }
    return earn;
}
function buyItem(cost){
    if(money >= cost){
        money = money - cost;
        document.getElementById("text").dispatchEvent(new Event("click"));
        return true;
    }  
    return false;  
}
function sellItem(name)
{
    document.getElementById(name+'_table').removeChild(document.getElementById(name + '_' + eval("shopCreaturesInfo." + name + ".count")));
    shopCreaturesInfo[name].count -= 1;
    money = Math.round(Number(money) + Number(shopCreaturesInfo[name].cost/2));
    document.getElementById("text").dispatchEvent(new Event("click"));
    shopCreaturesInfo[name].cost = Math.round(shopCreaturesInfo[name].cost/scaleFactor);
    passiveEarn = countPassiveEarn();
    document.getElementById("earn").dispatchEvent(new Event("click"));
    document.getElementById(name + "_count").dispatchEvent(new Event("click"));
    document.getElementById(name + "_price").dispatchEvent(new Event("click"));
}
function fromCostToPriceList(price,div){
    let p = (price-price%(div/1000))/div;
    return p;
}
function priceList(price){
    if(price<1e6){
        return price;
    }
    else if(1e6 <= price && price < 1e9){
        return fromCostToPriceList(price,1e6) + " million";
    }
    else if(1e9 <= price && price < 1e12){
        return fromCostToPriceList(price,1e9) + " billion";
    }
    else{
        return fromCostToPriceList(price,1e12) + " trillion";
    }
}
function createShopPrice(name){
    let itemCost = document.createElement("p");
    itemCost.className = "priceList";
    itemCost.setAttribute("id", name + "_price");
    itemCost.style.userSelect = "none";
    itemCost.textContent = shopCreaturesInfo[name].cost;
    itemCost.setAttribute("name", name)
    function changeShopPrice(){ 
        let new_cost = eval("shopCreaturesInfo." + name + ".cost") 
        itemCost.textContent = priceList(new_cost);
    }
    itemCost.addEventListener("click",changeShopPrice,false);
    itemCost.dispatchEvent(new Event("click"));
    return itemCost;
}
function createShopItemСount(name){
    let itemCount = document.createElement("p");
    itemCount.className = "countList";
    itemCount.setAttribute("id", name + "_count");
    itemCount.textContent = shopCreaturesInfo[name].count;
    itemCount.style.userSelect = "none";
    function changeShopCount(){ 
        let new_count = eval("shopCreaturesInfo." + name + ".count") 
        itemCount.textContent = priceList(new_count);
    }
    itemCount.addEventListener("click",changeShopCount,false);
    return itemCount;
}
function createShopItem(alt, id){
    image = "images/" + id + ".png";
    let item = document.createElement('img');
    item.src = image;
    item.addEventListener('load', loadShopItem, false);
    function loadShopItem() { 
        item.setAttribute('alt', alt);
        item.setAttribute('id', id);
        item.className = "imageShop";
    }
    return item;
}
function createAwardInfoDiv(id,name){
    let info_div = document.createElement('div');
    info_div.id = "info_"+id;
    info_div.style.display = "none";
    info_div.style.padding = "10px";
    info_div.style.background = "#f3f3f3";
    info_div.style.height = "40px";
    info_div.style.width = "80px";
    info_div.style.left = "-130px";
    info_div.textContent = "Improves the "+name;
    return info_div;
}
function createShopInfoDiv(name){
    let info_div = document.createElement('div');
    info_div.id = "info_"+name;
    info_div.style.display = "none";
    info_div.style.padding = "10px";
    info_div.style.background = "#f3f3f3";
    info_div.style.height = "50px";
    info_div.style.width = "110px";
    info_div.style.left = "-130px";
    info_div.addEventListener('click', changeTextContent, false);
    function changeTextContent(){
        let new_count = eval("shopCreaturesInfo." + name + ".count");
        let new_profit = eval("shopCreaturesInfo." + name + ".profit");
        info_div.textContent = "Profit(1):" + priceList(new_profit) + "\nProfit(all):" + priceList(new_profit*new_count);
    }
    return info_div;
}
function createPeasant(){
    let peasant_div = document.createElement('div');
    peasant_div.style.right = "50px";
    peasant_div.style.top = "0px";
    peasant_div.style.position = "absolute";
    let name = "peasant";
    let peasantCost = createShopPrice("peasant");
    let peasantCount = createShopItemСount("peasant");
    let peasant = createShopItem('Peasant','peasant');
    let info_div = createShopInfoDiv("peasant");
    peasant.style.cursor = "pointer";
    peasant.addEventListener('click', addCountUpPeasant, false);
    peasant.addEventListener('mouseover', showInfoPeasant, false);
    peasant.addEventListener('mouseout', hideInfoPeasant, false);
    function showInfoPeasant(){
        info_div.style.display = "block";
        info_div.style.position = "absolute";
        info_div.style.zIndex = "9999";
        document.getElementById("info_peasant").dispatchEvent(new Event('click'));
    }
    function hideInfoPeasant(){
        info_div.style.display = "none";
    }
    function addCountUpPeasant(){
        if(!isSell){
            if(buyItem(shopCreaturesInfo.peasant.cost)){
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").append(createTable('peasant',0));}
                putItem('peasant');  
                document.getElementById("info_peasant").dispatchEvent(new Event('click'));
            }
        }else{
            if(shopCreaturesInfo[name].count){
                sellItem('peasant');
                document.getElementById("info_peasant").dispatchEvent(new Event('click'));
                checkBorder();  
                if(shopCreaturesInfo[name].count == 0){
                    document.getElementById("mapDiv").removeChild(document.getElementById('peasant_table'))
                }
            }

        }
    }
    peasant_div.append(info_div);
    peasant_div.append(peasantCost);
    peasant_div.append(peasantCount);
    peasant_div.append(peasant);
    return peasant_div;
}
function createHut(){
    let hut_div = document.createElement('div');
    hut_div.style.right = "50px";
    hut_div.style.top = "115px";
    hut_div.style.position = "absolute";    
    let name = "hut";
    let hut = createShopItem('Hut','hut');
    let info_div = createShopInfoDiv("hut");
    hut.style.cursor = "pointer";
    hut.addEventListener('click', addCountUpHut, false);
    hut.addEventListener('mouseover', showInfoHut, false);
    hut.addEventListener('mouseout', hideInfoHut, false);
    function showInfoHut(){
        info_div.style.display = "block";
        info_div.style.position = "absolute";
        info_div.style.zIndex = "9999";
        document.getElementById("info_hut").dispatchEvent(new Event('click'));
    }
    function hideInfoHut(){
        info_div.style.display = "none";
    }
    function addCountUpHut(){
        if(!isSell){
            if(buyItem(shopCreaturesInfo.hut.cost)){
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").append(createTable('hut',1));}
                putItem('hut');
                document.getElementById("info_hut").dispatchEvent(new Event('click'));
            }
        }else{
            if(shopCreaturesInfo[name].count){
                sellItem('hut');
                document.getElementById("info_hut").dispatchEvent(new Event('click'));
                checkBorder();  
                if(shopCreaturesInfo[name].count == 0){document.getElementById("mapDiv").removeChild(document.getElementById('hut_table'))}
            }

        }
    }
    let hutCost = createShopPrice("hut");
    let hutCount = createShopItemСount("hut");
    hut_div.append(info_div)
    hut_div.append(hutCost);
    hut_div.append(hutCount);
    hut_div.append(hut);
    return hut_div;
}
function createWarrior(){
    let warrior_div = document.createElement('div');
    warrior_div.style.right = "50px";
    warrior_div.style.top = "230px";
    warrior_div.style.position = "absolute";    
    let name = "warrior";
    let warrior = createShopItem('Warrior','warrior');
    let info_div = createShopInfoDiv("warrior");
    warrior.style.cursor = "pointer";
    warrior.addEventListener('click', addCountUpWarrior, false);
    warrior.addEventListener('mouseover', showInfoWarrior, false);
    warrior.addEventListener('mouseout', hideInfoWarrior, false);
    function showInfoWarrior(){
        info_div.style.display = "block";
        info_div.style.position = "absolute";
        info_div.style.zIndex = "9999";
        document.getElementById("info_warrior").dispatchEvent(new Event('click'));
    }
    function hideInfoWarrior(){
        info_div.style.display = "none";
    }
    function addCountUpWarrior(){
        if(!isSell){
            if(buyItem(shopCreaturesInfo.warrior.cost)){
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").append(createTable('warrior',2));}
                putItem("warrior");
                document.getElementById("info_warrior").dispatchEvent(new Event('click'));
            }
        }else{
            if(shopCreaturesInfo[name].count){
                sellItem('warrior');
                document.getElementById("info_warrior").dispatchEvent(new Event('click'));
                checkBorder();  
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").removeChild(document.getElementById('warrior_table'))}
            }
        }
    }
    let warriorCost = createShopPrice("warrior");
    let warriorCount = createShopItemСount("warrior");
    warrior_div.append(info_div);
    warrior_div.append(warriorCost);
    warrior_div.append(warriorCount);
    warrior_div.append(warrior);
    return warrior_div;
}
function createFortress(){
    let fortress_div = document.createElement('div');
    fortress_div.style.right = "50px";
    fortress_div.style.top = "345px";
    fortress_div.style.position = "absolute";   
    let name = "fortress";
    let fortress = createShopItem('Fortress','fortress');
    let info_div = createShopInfoDiv("fortress");
    fortress.style.cursor = "pointer";
    fortress.addEventListener('click', addCountUpFortress, false);
    fortress.addEventListener('mouseover', showInfoFortress, false);
    fortress.addEventListener('mouseout', hideInfoFortress, false);
    function showInfoFortress(){
        info_div.style.display = "block";
        info_div.style.position = "absolute";
        info_div.style.zIndex = "9999";
        document.getElementById("info_fortress").dispatchEvent(new Event('click'));
    }
    function hideInfoFortress(){
        info_div.style.display = "none";
    }
    function addCountUpFortress(){
        if(!isSell){
            if(buyItem(shopCreaturesInfo.fortress.cost)){
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").append(createTable("fortress",3));}
                putItem("fortress");
                document.getElementById("info_fortress").dispatchEvent(new Event('click'));
            }   
        }else{
            if(shopCreaturesInfo[name].count){
                sellItem('fortress');
                document.getElementById("info_fortress").dispatchEvent(new Event('click'));
                checkBorder();  
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").removeChild(document.getElementById('fortress_table'))}
            }
        }
    }
    let fortressCost = createShopPrice("fortress");
    let fortressCount = createShopItemСount("fortress");
    fortress_div.append(info_div);
    fortress_div.append(fortressCost);
    fortress_div.append(fortressCount);
    fortress_div.append(fortress);
    return fortress_div;
}
function createWizard(){
    let wizard_div = document.createElement('div');
    wizard_div.style.right = "50px";
    wizard_div.style.top = "460px";
    wizard_div.style.position = "absolute";    
    let name = "wizard";
    let wizard = createShopItem('Wizard','wizard');
    let info_div = createShopInfoDiv("wizard");
    wizard.style.cursor = "pointer";
    wizard.addEventListener('click', addCountUpWizard, false);
    wizard.addEventListener('mouseover', showInfoWizard, false);
    wizard.addEventListener('mouseout', hideInfoWizard, false);
    function showInfoWizard(){
        info_div.style.display = "block";
        info_div.style.position = "absolute";
        info_div.style.zIndex = "9999";
        document.getElementById("info_wizard").dispatchEvent(new Event('click'));
    }
    function hideInfoWizard(){
        info_div.style.display = "none";
    }
    function addCountUpWizard(){
        if(!isSell){
            if(buyItem(shopCreaturesInfo.wizard.cost)){
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").append(createTable("wizard",4));}
                putItem("wizard");
                document.getElementById("info_wizard").dispatchEvent(new Event('click'));
            }  
        }else{
            if(shopCreaturesInfo[name].count){
                sellItem('wizard');
                document.getElementById("info_wizard").dispatchEvent(new Event('click'));
                checkBorder();  
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").removeChild(document.getElementById('wizard_table'))}
            }
        }
    }
    let wizardCost = createShopPrice("wizard");
    let wizardCount = createShopItemСount("wizard");
    wizard_div.append(info_div);
    wizard_div.append(wizardCost);
    wizard_div.append(wizardCount);
    wizard_div.append(wizard);
    return wizard_div;
}
function createTower(){
    let tower_div = document.createElement('div');
    tower_div.style.right = "50px";
    tower_div.style.top = "575px";
    tower_div.style.position = "absolute";    
    let name = "tower";
    let tower= createShopItem('Tower','tower');
    let info_div = createShopInfoDiv("tower");
    tower.style.cursor = "pointer";
    tower.addEventListener('click', addCountUpTower, false);
    tower.addEventListener('mouseover', showInfoTower, false);
    tower.addEventListener('mouseout', hideInfoTower, false);
    function showInfoTower(){
        info_div.style.display = "block";
        info_div.style.position = "absolute";
        info_div.style.zIndex = "9999";
        document.getElementById("info_tower").dispatchEvent(new Event('click'));
    }
    function hideInfoTower(){
        info_div.style.display = "none";
    }
    function addCountUpTower(){            
        if(!isSell){
            if(buyItem(shopCreaturesInfo.tower.cost)){
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").append(createTable("tower",5));}
                putItem("tower");
                document.getElementById("info_tower").dispatchEvent(new Event('click'));
            }      
        }else{
            if(shopCreaturesInfo[name].count){
                sellItem('tower');
                document.getElementById("info_tower").dispatchEvent(new Event('click'));
                checkBorder();  
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").removeChild(document.getElementById('tower_table'))}
            }
        }
    }
    let towerCost = createShopPrice("tower");
    let towerCount = createShopItemСount("tower");
    tower_div.append(info_div);
    tower_div.append(towerCost);
    tower_div.append(towerCount);
    tower_div.append(tower);    
    return tower_div;
}
function createCastle(){
    let castle_div = document.createElement('div');
    castle_div.style.right = "50px";
    castle_div.style.top = "690px";
    castle_div.style.position = "absolute";    
    let name = "castle";
    let castle= createShopItem('Castle','castle');
    let info_div = createShopInfoDiv("castle");
    castle.style.cursor = "pointer";
    castle.addEventListener('click', addCountUpCastle, false);
    castle.addEventListener('mouseover', showInfoCastle, false);
    castle.addEventListener('mouseout', hideInfoCastle, false);
    function showInfoCastle(){
        info_div.style.display = "block";
        info_div.style.position = "absolute";
        info_div.style.zIndex = "9999";
        document.getElementById("info_castle").dispatchEvent(new Event('click'));
    }
    function hideInfoCastle(){
        info_div.style.display = "none";
    }
    function addCountUpCastle(){            
        if(!isSell){
            if(buyItem(shopCreaturesInfo.castle.cost)){
                if (!shopCreaturesInfo[name].count){
                    firework();
                }
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").append(createTable("castle",6));}
                putItem("castle");
                document.getElementById("info_castle").dispatchEvent(new Event('click'));
            }      
        }else{
            if(shopCreaturesInfo[name].count){
                sellItem('castle');
                document.getElementById("info_castle").dispatchEvent(new Event('click'));
                checkBorder()
                if(!shopCreaturesInfo[name].count){document.getElementById("mapDiv").removeChild(document.getElementById('castle_table'))}
            }
        }
    }
    let castleCost = createShopPrice("castle");
    let castleCount = createShopItemСount("castle");
    castle_div.append(info_div);
    castle_div.append(castleCost);
    castle_div.append(castleCount);
    castle_div.append(castle);    
    return castle_div;
}
function createInfoSellBuyDiv(){
    let info_div = document.createElement('div');
    info_div.style.display = "none";
    info_div.style.padding = "10px";
    info_div.style.background = "#f3f3f3";
    info_div.style.height = "40px";
    info_div.style.width = "90px";
    info_div.style.top = "27px";
    info_div.style.left = "-50px";
    info_div.textContent = "Plus: buy\nMinus: sell";
    return info_div;
}
function createPlus(){
    let plus = document.createElement('img')
    plus.src = 'images/plus.png';
    plus.style.position = "relative";
    plus.style.width = "20px";
    plus.style.cursor = "pointer";
    plus.id = "plus";
    plus.style.border = "2px solid #ffd700";
    plus.addEventListener('click', buy, false);
    function buy(){
        isSell = 0;
        document.getElementById("minus").style.border = "2px solid gray";
        plus.style.border = "2px solid #ffd700";
    }
    return plus;
}
function createMinus(){
    let minus = document.createElement('img')
    minus.src = 'images/minus.png';
    minus.style.position = "relative";
    minus.style.marginLeft = "3px";
    minus.style.width = "20px";
    minus.style.cursor = "pointer";
    minus.id = "minus";
    minus.addEventListener('click', sell, false);
    minus.style.border = "2px solid gray";
    function sell(){
        isSell = 1;
        document.getElementById("plus").style.border = "2px solid gray";
        minus.style.border = "2px solid #ffd700";
    }
    return minus;
}
function createPlusMinisDiv(){
    let plus_minus_div = document.createElement('div');
    plus_minus_div.style.position = "absolute";
    plus_minus_div.style.width = "58px";
    plus_minus_div.style.height = "20px";
    plus_minus_div.style.left = "260px";
    plus_minus_div.style.top = "5px";  
    let info_div = createInfoSellBuyDiv();
    plus_minus_div.addEventListener('mouseover', showInfo, false);
    plus_minus_div.addEventListener('mouseout', hideInfo, false);
    function showInfo(){
        info_div.style.display = "block";
        info_div.style.position = "absolute";
        info_div.style.zIndex = "9999";
    }
    function hideInfo(){
        info_div.style.display = "none";
    }
    plus_minus_div.append(info_div);
    plus_minus_div.append(createPlus());
    plus_minus_div.append(createMinus());
    return plus_minus_div
}
function createShop(){
    let shop_div = document.createElement('div');
    shop_div.id = "shop_div";
    shop_div.style.width = "342px";
    shop_div.style.float = "right";
    shop_div.style.top = "50px";
    shop_div.className = "rightBlock";
    let count = document.createElement('p');
    count.textContent = "Count";
    count.id = "Count";
    count.style.userSelect = "none";
    shop_div.append(count);
    let price = document.createElement('p');
    price.textContent = "Price";
    price.id = "Price";
    price.style.userSelect = "none";
    shop_div.append(price);
    shop_div.append(createPlusMinisDiv());
    shop_div.append(createPeasant());
    shop_div.append(createHut());
    shop_div.append(createWarrior());
    shop_div.append(createFortress());
    shop_div.append(createWizard());
    shop_div.append(createTower());
    shop_div.append(createCastle());
    return shop_div;
}
function createAwardPrice(name, awardCreaturesItem, cost){
    let awardCost = document.createElement("p");
    awardCost.className = "priceAwardList";
    awardCost.setAttribute("id", name);
    awardCost.textContent = cost;
    awardCost.style.userSelect = "none";
    awardCost.setAttribute("awardCreaturesItem", awardCreaturesItem)
    function changeAwardPrice(){ 
        let new_cost = eval("awardsCreaturesInfo."+awardCreaturesItem+".cost") 
        awardCost.textContent = priceList(new_cost);
    }
    awardCost.addEventListener("click",changeAwardPrice,false);
    awardCost.dispatchEvent(new Event("click"));
    return awardCost;
}
function createAwardItem(image, alt, id){
    let award = document.createElement('img');
    award.src = image;
    award.style.cursor = "pointer";
    award.addEventListener('load', loadAward, false);
    function loadAward() { 
        award.setAttribute('alt', alt);
        award.setAttribute('id', id);
        award.className = "imageAward";
    }
    return award;
}
function createUpgrade(top,alt,id,item){
    let upgrade_div = document.createElement('div');
    upgrade_div.style.right = "100px";
    upgrade_div.style.top = top;
    upgrade_div.style.position = "absolute";
    let img = 'images/upgrade/'+id+'.png';
    let upgrade = createAwardItem(img,alt,id);
    let info_div=createAwardInfoDiv(id,item);
    upgrade.addEventListener('click', addUpgrade, false);
    upgrade.addEventListener('mouseover', showInfoUpgrade, false);
    upgrade.addEventListener('mouseout', hideInfoUpgrade, false);
    function showInfoUpgrade(){
        if(awardsCreaturesInfo[id].isExist==0){
            info_div.style.display = "block";
            info_div.style.position = "absolute";
            info_div.style.zIndex = "9999";
        }
    }
    function hideInfoUpgrade(){
        info_div.style.display = "none";
    }
    function addUpgrade(){            
        if(awardsCreaturesInfo[id].isExist == 0 && buyItem(awardsCreaturesInfo[id].cost, awardsCreaturesInfo[id].profit)){
            awardsCreaturesInfo[id].isExist = 1;
            shopCreaturesInfo[item].profit = shopCreaturesInfo[item].profit*2;
            passiveEarn = countPassiveEarn();
            document.getElementById("earn").dispatchEvent(new Event("click"));
            checkBorder();
            document.getElementById("info_"+id).style.display = "none";
        }      
    }
    let upgradeCost = createAwardPrice(id+'_price', id, awardsCreaturesInfo[id].cost);
    upgrade_div.append(info_div);
    upgrade_div.append(upgradeCost);
    upgrade_div.append(upgrade); 
    return upgrade_div;
}
function createAwards(){
    let award_div = document.createElement('div');
    award_div.id = "award_div";
    award_div.style.width = "342px";
    award_div.style.float = "right";
    award_div.className = "rightBlock";
    award_div.style.top = "50px";
    award_div.style.visibility = "hidden";
    award_div.append(createUpgrade('0px','Axe','axe','peasant'));
    award_div.append(createUpgrade('60px','Shovel','shovel','peasant'));
    award_div.append(createUpgrade('120px','Wheat','wheat','hut'));
    award_div.append(createUpgrade('180px','Meat','meat','hut'));
    award_div.append(createUpgrade('240px','Sword','sword','warrior'));
    award_div.append(createUpgrade('300px','Armour','armour','warrior'));
    award_div.append(createUpgrade('360px','Barrel','barrel','fortress'));
    award_div.append(createUpgrade('420px','Horse','horse','fortress'));
    award_div.append(createUpgrade('480px','Hat','hat','wizard'));
    award_div.append(createUpgrade('540px','Stick','stick','wizard'));
    award_div.append(createUpgrade('600px','Potion','potion','tower'));
    award_div.append(createUpgrade('660px','Heal','heal','tower'));
    award_div.append(createUpgrade('720px','Prince','prince','castle'));
    award_div.append(createUpgrade('780px','Princess','princess','castle'));
    return award_div;
}
function coins(){
    let duration = 2000;
    let animationEnd = Date.now() + duration;
    let skew = 1;
    let min = 0;
    let max = 342/window.innerWidth; 
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    (function frame() {
        let timeLeft = animationEnd - Date.now();
        let ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);
        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            gravity: 0.5,
            origin: {
                x: Math.random()*(max - min) + min,
                y: (Math.random() * skew) - 0.2
            },
            colors: ['#ffd700'],
            shapes: ['circle'],
            scalar: randomInRange(0.4, 1)//размеры
        });
        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    }());    
}
function createImageCoin(){
    let coin= document.createElement('img');
    coin.style.cursor = "pointer";
    coin.src = 'images/coin.gif';
    coin.addEventListener('load', LoadCoin, false);
    function LoadCoin() {
        coin.setAttribute('width', '200px');
        coin.setAttribute('height', '200px');
        coin.setAttribute('alt', 'Coin');
        coin.setAttribute('id', 'coin');
        coin.setAttribute('z-index', '2');
        coin.style.display = 'block';
        coin.style.margin = "auto";
        coin.style.marginTop = "100px";
        coin.addEventListener('click', addMoney, false);
        function addMoney(){
            money = money + 10;
            document.getElementById("text").dispatchEvent(new Event("click"));     
            checkBorder();  
        }
        setInterval(function run() {
            money = money + passiveEarn;
            document.getElementById("text").dispatchEvent(new Event("click"));
            if(passiveEarn>0)coins();
            if(isGame>0){
                localStorage.setItem('money',money);
                for(element in shopCreaturesInfo){
                    localStorage.setItem(element+'Cost',shopCreaturesInfo[element].cost);
                    localStorage.setItem(element+'Count',shopCreaturesInfo[element].count);
                    localStorage.setItem(element+'Profit',shopCreaturesInfo[element].profit);
                }
                for(element in awardsCreaturesInfo){
                    localStorage.setItem(element,awardsCreaturesInfo[element].isExist);
                }
            }               
            checkBorder();        
          }, 2000);
    }
    return coin;
}
function createInfoCoin(){
    let info_div = document.createElement('div');
    info_div.style.width = "342px";
    info_div.style.height = "100px";
    info_div.style.marginTop = "80px";
    let score_h = document.createElement("H1");
    score_h.id = "text";
    score_h.style.color = "white";
    score_h.style.userSelect = "none";
    score_h.style.height = "40px";
    score_h.textContent = "Money: " + priceList(money);
    score_h.addEventListener('click', changeMoneyText, false);
    function changeMoneyText(){
        score_h.textContent = "Money: " + priceList(money);
    }
    let earn_h = document.createElement("H3");
    earn_h.id = "earn";
    earn_h.style.color = "white";
    earn_h.style.userSelect = "none";
    earn_h.style.marginTop = "5px";

    earn_h.addEventListener('click', changeEarnText, false);
    earn_h.textContent = "Passive earning: " + priceList(passiveEarn);
    function changeEarnText(){
        earn_h.textContent = "Passive earning: " + priceList(passiveEarn);
    }
    info_div.append(score_h);
    info_div.append(earn_h);
    return info_div;
}
function createCoin(){
    let coin_div = document.createElement('div');
    coin_div.style.width = "342px";
    coin_div.style.float = "left";
    coin_div.className = "leftBlock";   
    coin_div.id = "coinDiv";  
    coin_div.append(createImageCoin());
    coin_div.append(createInfoCoin());
    return coin_div;
}
function createMap(){
    let map_div = document.createElement('div');
    map_div.style.float = "center";
    map_div.setAttribute("id","mapDiv");
    map_div.style.height = "100vh";
    map_div.style.marginRight = "342px";
    map_div.style.marginLeft= "342px";
    return map_div;
}
function createPanelMenu(id,textContent,byIdText,byIdOurDiv,byIdDiv){
    let panel_h = document.createElement("H2");
    panel_h.id = id;
    panel_h.style.color = "white";
    panel_h.textContent = textContent;
    panel_h.style.textDecoration = "underline";
    panel_h.style.textAlign = "center";
    panel_h.style.userSelect = "none";
    panel_h.style.cursor = "pointer";
    panel_h.addEventListener('click', changePanel, false);
    function changePanel(){
        panel_h.style.textDecoration = "underline";
        document.getElementById(byIdText).style.textDecoration = "none";
        document.getElementById(byIdOurDiv).style.visibility = "hidden";
        document.getElementById(byIdDiv).style.visibility = "visible";
    }
    return panel_h;
}
function createPanel(){
    let panel_div = document.createElement('div');
    panel_div.style.height = "50px";
    panel_div.style.width = "342px";
    panel_div.style.display = "block";
    let span_div1 = document.createElement('span');
    span_div1.className = "span";
    let span_div2 = document.createElement('span');
    span_div2.className = "span";
    let shop_h = createPanelMenu("shop_text","Store","award_text","award_div","shop_div");
    let award_h = createPanelMenu("award_text","Upgrade","shop_text","shop_div","award_div");
    award_h.style.textDecoration = "none";
    span_div1.appendChild(shop_h);
    span_div2.appendChild(award_h);
    panel_div.appendChild(span_div1);
    panel_div.appendChild(span_div2);
    return panel_div;
}
function createRightDiv(){
    let right_div = document.createElement('div');
    right_div.style.width = "342px";
    right_div.style.float = "right";
    right_div.style.height = "100vh";
    right_div.style.position="relative";
    right_div.style.overflowX = "hidden";
    right_div.id = "rightDiv";
    right_div.className="rightDiv";
    right_div.style.overflowY = "scroll";
    right_div.appendChild(createShop());
    right_div.appendChild(createAwards());
    right_div.appendChild(createPanel());
    return right_div;
}
function createButtonNewGameDiv(){
    let button_div = document.createElement('div');
    button_div.style.width = "150px";
    button_div.style.height = "50px";
    button_div.style.backgroundColor = "#ffd700";
    button_div.style.border = "5px solid #d9b500";
    button_div.textContent = "New game";
    button_div.style.textAlign = "center";
    button_div.style.fontSize = "28px";
    button_div.style.paddingTop = "10px";
    button_div.style.userSelect = "none";
    button_div.style.cursor = "pointer";
    button_div.addEventListener('click',newGame,false)
    function newGame(){
        for(element in shopCreaturesInfo){
            localStorage.removeItem(element+'Cost');
            localStorage.removeItem(element+'Count');
            localStorage.removeItem(element+'Profit');
        }
        for(element in awardsCreaturesInfo){
            localStorage.removeItem(element);
        }
        isGame = 1;
        document.getElementById("menuDiv").style.display = "none";
    }
    return button_div;
}
function putSavedAwards(){
    for(element in awardsCreaturesInfo){
        if(awardsCreaturesInfo[element].isExist == 1){
            document.getElementById(element).style.border = "2px solid gray";
        }
    }
}
function resumeGame(){
    money = Number(localStorage.getItem('money'));
    let i = 0;
    for(element in shopCreaturesInfo)
    {
        if(localStorage.getItem(element+'Cost')!== null && localStorage.getItem(element+'Count')!=null &&
            localStorage.getItem(element+'Profit')!== null){
            shopCreaturesInfo[element].cost = Number(localStorage.getItem(element+'Cost'));
            shopCreaturesInfo[element].count = Number(localStorage.getItem(element+'Count'));
            shopCreaturesInfo[element].profit = Number(localStorage.getItem(element+'Profit'));
            document.getElementById(element+"_price").dispatchEvent(new Event('click'));
            document.getElementById(element+"_count").dispatchEvent(new Event('click'));
            putSavedItem(element,i);
            i++;
        }
    }
    for(element in awardsCreaturesInfo){
        awardsCreaturesInfo[element].isExist = Number(localStorage.getItem(element));
    }
    passiveEarn = countPassiveEarn();
    document.getElementById("earn").dispatchEvent(new Event("click"));
    putSavedAwards()
    isGame = 1;
    document.getElementById("menuDiv").style.display = "none"; 
    document.getElementById("text").dispatchEvent(new Event("click"));
    document.getElementById("earn").dispatchEvent(new Event("click"));
}
function createButtonResumeDiv(){
    let button_div = document.createElement('div');
    button_div.style.width = "150px";
    button_div.style.height = "50px";
    button_div.style.backgroundColor = "#ffd700";
    button_div.style.border = "5px solid #d9b500";
    button_div.textContent = "Continue";
    button_div.style.textAlign = "center";
    button_div.style.userSelect = "none";
    button_div.style.cursor = "pointer";
    button_div.style.fontSize = "28px";
    button_div.style.paddingTop = "10px";
    button_div.style.marginRight ="50px";
    button_div.addEventListener('click',resumeGame,false)
    return button_div;
}
function createGameDiv(){
    let menu_div = document.createElement('div');
    menu_div.id = "menuDiv";
    menu_div.style.width = "100wh";
    menu_div.style.height = "100vh";
    menu_div.style.display = "flex";
    menu_div.style.justifyContent = "center";
    menu_div.style.alignItems = "center";
    menu_div.style.backgroundImage = "url(images/стена.png)";
    menu_div.append(createButtonResumeDiv(-300));
    menu_div.append(createButtonNewGameDiv(200));
    return menu_div;
}
window.onload = function () {
    let window_div = document.createElement('div');
    let coin_div = createCoin();
    let right_div = createRightDiv();
    let map_div = createMap();
    window_div.append(createGameDiv());
    window_div.append(coin_div);
    window_div.append(right_div);
    window_div.append(map_div);
    document.body.append(window_div);
}
