package tw.yes.multiviewviewpager;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class MainFragment extends Fragment {

    public MainFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_my, container, false);
        MultiViewPagerAdapter adapter = new MultiViewPagerAdapter(getFragmentManager());
        ViewPager pager = (ViewPager) rootView.findViewById(R.id.pager);
        pager.setAdapter(adapter);
        return rootView;
    }

}
