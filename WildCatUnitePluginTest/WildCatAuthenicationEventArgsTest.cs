using System;
using System.Reflection;
using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Idioms;
using FluentAssertions;
using Moq;
using WildCatUnitePlugin;
using Xunit;

namespace WildCatUnitePluginTest
{
    public class WildCatAuthenicationEventArgsTest
    {
        private readonly Type _sutType = typeof(WildCatAuthenicationEventArgs);
        private readonly IFixture _fixture;

        public WildCatAuthenicationEventArgsTest()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        #region Ctor

        [Trait("Category", "Unit")]
        [Fact]
        public void NullArguments_Ctor_ThrowArgumentNullException()
        {
            // Given
            var assertion = new GuardClauseAssertion(_fixture, new NullReferenceBehaviorExpectation());
            // When
            ConstructorInfo[] sutConstructorInfos = _sutType.GetConstructors();
            // Then
            assertion.Verify(sutConstructorInfos);
        }

        [Trait("Category", "Unit")]
        [Fact]
        public void Sut_Type_MustNotHaveDefaultCtor()
        {
            // Given
            // When
            // Then
            _sutType.Should().NotHaveDefaultConstructor();
        }

        [Trait("Category", "Unit")]
        [Fact]
        public void Sut_Type_ImplementsInterface()
        {
            // Given
            // When
            // Then
            _sutType.Should().BeAssignableTo<WildCatAuthenicationEventArgs>();
        }

        #endregion Ctor

        [Trait("Category", "Unit")]
        [Fact]
        public void Given_When_Then()
        {
            //// Given
            //var sut = _fixture.Create<AutomationHelper>();
            //var name = _fixture.Create<string>();
            //var id = _fixture.Create<int>();
            //var rootWindows = _fixture.Create<List<Mock<IAutomationElementWrapper>>>();
            //var foundWindowElement = _fixture.Create<Mock<IAutomationElementWrapper>>();
            //var invokePatternWrapper = _fixture.Create<Mock<IInvokePatternWrapper>>();

            //foundWindowElement.Setup(mock => mock.GetCurrentPattern(It.IsAny<AutomationPattern>()))
            //    .Returns(invokePatternWrapper.Object);

            //_automationElementWrapperProvider
            //    .Setup(mock => mock.RootElement.FindAll(It.IsAny<TreeScope>(), It.IsAny<Condition>()))
            //    .Returns(rootWindows.Select(mock => mock.Object).ToList());

            //rootWindows.ForEach(mock => mock.Setup(x => x.FindFirst(It.IsAny<TreeScope>(), It.IsAny<Condition>()))
            //    .Returns((IAutomationElementWrapper)null)
            //);
            //rootWindows.Last().Setup(mock => mock.FindFirst(It.IsAny<TreeScope>(), It.IsAny<Condition>()))
            //    .Returns(foundWindowElement.Object);

            //// When
            //sut.InvokeAutomationElementByName(name, id);
            //// Then
            //invokePatternWrapper.Verify(v => v.Invoke(), Times.Once);
        }
    }
}
