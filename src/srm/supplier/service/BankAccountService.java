package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.MyJsonUtil;

import srm.supplier.data.BankAccountMapper;
import srm.supplier.model.BankAccount;


@Service
public class BankAccountService {
	@Autowired
	private BankAccountMapper mapper;
	@Autowired
	private SupplierInter supplierInter;

	public List<BankAccount> getBankAccountList(Map<String,Object> params) {
		return mapper.getBankAccountList(params);
	}
	@Transactional
	public void addBankAccount(BankAccount[] arr) {
		for(BankAccount obj: arr) {
			String jsonmap = MyJsonUtil.obj2string(obj);
			String result = supplierInter.addAppBankAccountByWS(jsonmap);
			CXFResponse<BankAccount> sf=MyJsonUtil.str2CXFResponse(result, BankAccount.class);
		    String account_out_id = sf.getParams().get("account_out_id").toString();
		    obj.setAccount_out_id(Integer.valueOf(account_out_id));
			mapper.addBankAccount(obj);			
		}
	}
	@Transactional
	public void updateBankAccount(BankAccount[] arr) {
		for(BankAccount obj: arr) {
			mapper.updateBankAccount(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updateAppBankAccountByWS(jsonmap);
		}
	}
	@Transactional
	public void deleteBankAccount(BankAccount[] arr) {
		for(BankAccount obj: arr) {
			mapper.deleteBankAccount(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.deleteAppBankAccountByWS(jsonmap);
		}
	}
}
