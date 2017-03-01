package erp.erp.PurchaseClearing.data;

import java.util.List;
import java.util.Map;

import erp.erp.PurchaseClearing.model.Cost;
import erp.erp.PurchaseClearing.model.CostBills;
import erp.erp.PurchaseClearing.model.JsFydbImp;
import erp.erp.PurchaseClearing.model.JsRkdbImp;
import erp.erp.PurchaseClearing.model.Notice;
import erp.erp.arrivalRegister.model.ArrivalRegister;



public interface NoticeMapper {
	public List<Notice> getNoticeList(Map<String,Object> params);
	public void addNotice(Notice obj);
	public void addRkd(CostBills obj);
	public void updateNotice(Notice obj);
	public void deleteNotice(Notice obj);
	public void deleteJsRkdbImp(JsRkdbImp obj);
	public void deleteRkd(CostBills obj);
	public List<CostBills> getCostBillsList(Map<String,Object> params);
    float getMaxTzdh(Map<String,Object> params);
    List<CostBills> getRkd(Map<String,Object> params);
    List<Cost> getFyd(Map<String,Object> params);
    List<Cost> getWdfy(Map<String,Object> params);
    List<CostBills> getWdrk(Map<String,Object> params);
    void DelRk(Map<String,Object> params);
    void DelCg(Map<String,Object> params);
    void delRkjgmx(Map<String,Object> params);
   //入库单导入
    List<JsRkdbImp> getJsRkdbImp(Map<String,Object> params);
   //费用单导入
    List<JsFydbImp> getJsFydbImp(Map<String,Object> params);
    void doLock(Map<String,Object> params);
    void doSend(Map<String,Object> params);
    void doArc(Map<String,Object> params);
    void doAllArc(Map<String,Object> params);
    int getYfbj(Map<String,Object> params);
    void addHtbh(Map<String,Object> params);
    void addRkdb(Map<String,Object> params);
    void addGlht(Map<String,Object> params);
    int getHtbhCount(Map<String,Object> params);
    int getCgjhCount(Map<String,Object> params);
    int getGlhtCount(Map<String,Object> params);
    int ifHxkp(Map<String,Object> params);
    void afterDelRk(Notice obj);
    void afterDelCg(Notice obj);
    void updateRkdhy(Map<String,Object> params);
    void updateCgfyb(Map<String,Object> params);
    void updateFzhm(Map<String,Object> params);
    void updateFyFzhm(Map<String,Object> params);
    Map<String,Object>  getFzzbj(Map<String,Object> params);
    List<JsRkdbImp> getGjjs(JsRkdbImp obj);
    int getLlcount(Map<String,Object> params);
    float getRkxhcf(Map<String,Object> params);
    void updateJsRkdbImp(JsRkdbImp obj);
    void addJsRkdbImp(JsRkdbImp obj);
    Map<String, Float> getTjdh(Map<String,Object> params);
    Map<String, Float> getThjeOne(Map<String,Object> params);
    Map<String, Float> getThjeTwo(Map<String,Object> params);
    float getTjdhnew(Map<String,Object> params);
    void addcgjgtzmxb(Map<String,Object> params);
    void updatecgjgtzmxb(Map<String,Object> params);
    void updateCfcgjgtzmxb(Map<String,Object> params);
    void updateThje(Map<String,Object> params);
    float getMaxfyxh(Map<String,Object> params);
    Float getKzdj(Map<String,Object> params);
    Float getKzdjTwo(Map<String,Object> params);
    Map<String, Object> getCpdj(Map<String,Object> params);
    Map<String, Object> getCpdjTwo(Map<String,Object> params);
    List<String> getBmqx(Map<String,Object> params);
    void getRkImpSum(Map<String,Object> params);
    List<JsRkdbImp> getSumRkd(Map<String,Object> params);
    List<JsFydbImp> getFydImpSum(Map<String,Object> params);
    List<ArrivalRegister> getArriveList(Map<String,Object> params);
    void deleteJsrkdb(Map<String,Object> params);
    void deleteJsfydb(Map<String,Object> params);
}

