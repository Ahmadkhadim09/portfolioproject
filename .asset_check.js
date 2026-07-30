(async()=>{
  try{
    const base='http://localhost:8081';
    const r=await fetch(base);
    const html=await r.text();
    const re=/(?:src|href)=['"]([^'"]+)['"]/g;
    const assets=new Set();
    let m;
    while((m=re.exec(html))!==null){assets.add(m[1])}
    console.log('Total assets found:',assets.size);
    for(const a of assets){
      let url=a;
      if(url.startsWith('/')) url=base+url;
      if(url.startsWith('//')) url='http:'+url;
      if(!/^https?:\/\//.test(url)) continue;
      try{
        const res=await fetch(url,{method:'HEAD'});
        console.log(res.status, url);
      }catch(e){
        console.log('ERR',url,e.message);
      }
    }
  }catch(e){
    console.error('FATAL',e);
  }
})();