package erp.erp.arrivalRegister.data;

import java.util.Date;
import java.util.List;
import java.util.Map;

import erp.erp.arrivalRegister.model.ArrivalRegister;
import erp.erp.arrivalRegister.model.Bzxssx;
import erp.erp.arrivalRegister.model.RkdList;


public interface ArrivalRegisterMapper {
	public List<ArrivalRegister> getArrivalRegisterList(Map<String,Object> params);
	public List<ArrivalRegister> getSumArrivalRegister(Map<String,Object> params);
	public void addArrivalRegister(ArrivalRegister obj);
	public void updateArrivalRegister(ArrivalRegister obj);
	public void deleteArrivalRegister(ArrivalRegister obj);
	//取到货单号
	int getMaxdhdh();
	//核销标记
	int getHxbj(Map<String,Object> params);
	//关联退库不允许编辑
	int getGltk(Map<String,Object> params);
	List<ArrivalRegister> getDhdjb(Map<String,Object> params);
	int getZtbj(Map<String,Object> params);
	void updateZtbj(Map<String,Object> params);
	//退货单号
	public double getdoubleFromSql(Map<String,Object> params);
	//中止货单
	void StopList(Map<String,Object> params);
	//入库单查询
	List<RkdList> getRkdList(Map<String,Object> params);
	int getICQ(Map<String,Object> params);
	/*void updateDhdh(Dhztb obj);*/
	Date getRksj(Map<String,Object> params);
	Date getSdsj(Map<String,Object> params);
	void updateRkTime(Map<String,Object> params);
    int IfAward(Map<String,Object> params);
    String getJhlb(Map<String,Object> params);
    int getCkmcb(Map<String,Object> params);
    String getsCsbh(Map<String,Object> params);
    double getllJhsl(Map<String,Object> params);
    double getllDhslqt(Map<String,Object> params);
    Bzxssx getBzxssx(Map<String,Object> params);
    void createTableSql(Map<String,Object> params);
    void insertSql(Map<String,Object> params);
    //历史到货
    List<ArrivalRegister> getHisArrivalRegister(Map<String,Object> params);
    void createView(Map<String,Object> params);
    //取消退货
    void cancelReturn(Map<String,Object> params);
}
