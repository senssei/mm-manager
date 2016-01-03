import navigateControlModule from './navigate-control.module';

import 'angular-mocks';

describe('mm-nav directive', () => {
  const module = angular.mock.module;
  const inject = angular.mock.inject;

  let $compile,
      $rootScope;

  beforeEach(module(navigateControlModule));

  beforeEach(inject((_$compile_, _$rootScope_)=> {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should display href without tooltip', ()=> {
    let element = $compile("<mm-nav state='test'></mm-nav>")($rootScope);
    $rootScope.$digest();

    expect(element.find('a')).to.have.length(1);
    expect(element.find('md-icon')).to.have.length(1);
    expect(element.find('md-tooltip')).to.have.length(0);

    expect(element.find('a').attr('ui-sref')).to.be.equal('test');
  });

  it('should display href with tooltip', ()=> {
    let element = $compile("<mm-nav state='test' tooltip-text='Test tooltip'></mm-nav>")($rootScope);
    $rootScope.$digest();

    expect(element.find('a')).to.have.length(1);
    expect(element.find('md-tooltip')).to.have.length(1);

    expect(element.html()).to.have.string('Test tooltip');
    expect(element.find('md-tooltip').scope().vm.tooltipText).to.equal('Test tooltip');
  });

  it('should have tooltip direction default to bottom if tooltip-text is set', () => {
    let element = $compile("<mm-nav state='test' tooltip-text='Test tooltip'></mm-nav>")($rootScope);
    $rootScope.$digest();

    expect(element.find('md-tooltip')).to.have.length(1);
    expect(element.html()).to.have.string('Test tooltip');
    expect(element.find('md-tooltip').scope().vm.tooltipDir).to.equal('bottom');
    expect(element.find('md-tooltip').scope().vm.tooltipText).to.equal('Test tooltip');
  });

  it('should have tooltip direction if tooltip-dir is set', () => {
    let element = $compile("<mm-nav state='test' tooltip-text='Test tooltip' tooltip-dir='top'></mm-nav>")($rootScope);
    $rootScope.$digest();

    expect(element.find('md-tooltip')).to.have.length(1);
    expect(element.html()).to.have.string('Test tooltip');
    expect(element.find('md-tooltip').scope().vm.tooltipDir).to.equal('top');
    expect(element.find('md-tooltip').scope().vm.tooltipText).to.equal('Test tooltip');
  });
})