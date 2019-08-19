# Copyright 2011-2019, The Trustees of Indiana University and Northwestern
#   University.  Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed
#   under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
#   CONDITIONS OF ANY KIND, either express or implied. See the License for the
#   specific language governing permissions and limitations under the License.
# ---  END LICENSE_HEADER BLOCK  ---

require 'rails_helper'

describe CollectionsController, type: :controller do
  # TODO: replace the fedora creates with solr mocking?
  let!(:collection) { FactoryBot.create(:collection, items: 1) }

  describe 'security' do
    context 'with end-user' do
      before do
        login_as :user
      end
      it "all routes should redirect to /" do
        expect(get :show, params: { id: collection.id }).to redirect_to(root_path)
      end
    end

    context 'with unauthenticated user' do
      it "all routes should redirect to sign in" do
        expect(get :show, params: { id: collection.id }).to redirect_to(/#{Regexp.quote(new_user_session_path)}\?url=.*/)
      end
    end
  end

  describe "#index" do
    let!(:collection2) { FactoryBot.create(:collection, items: 1) }
    let!(:collection3) { FactoryBot.create(:collection) }
    let!(:public_media_object) { FactoryBot.create(:fully_searchable_media_object, collection: collection3) }

    it "admin should see all collections" do
      login_as :administrator
      get 'index'
      expect(response).to be_ok
      expect(assigns(:doc_presenters).count).to eql(3)
      expect(assigns(:doc_presenters).map(&:id)).to match_array([collection.id, collection2.id, collection3.id])
    end

    it "managers should see their collections and collections with public items" do
      login_user(collection.managers.first)
      get 'index'
      expect(response).to be_ok
      expect(assigns(:doc_presenters).count).to eql(2)
      expect(assigns(:doc_presenters).map(&:id)).to match_array([collection.id, collection3.id])
    end

    it "end users should see collections with public items" do
      login_as :user
      get 'index'
      expect(response).to be_ok
      expect(assigns(:doc_presenters).count).to eql(1)
      expect(assigns(:doc_presenters).map(&:id)).to match_array([collection3.id])
    end
  end

  describe "#show" do
    it "should allow access to managers" do
      login_user(collection.managers.first)
      get 'show', params: { id: collection.id }
      expect(response).to be_ok
      expect(response).to render_template(:show)
      expect(assigns(:doc_presenter).id).to eq collection.id
    end
  end
end
